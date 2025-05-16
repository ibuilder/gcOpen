/**
 * gcVDC - Charts and Data Visualization
 * This file handles all chart creation and management throughout the application
 */

// Store chart instances to reference later for updates
let charts = {
  progressTrend: null,
  statusDistribution: null,
  systemProgress: null,
  clashSummaryByPriority: null,
  clashSummaryByType: null
};

// Color palettes
const systemColors = {
  structural: '#0d6efd',
  mechanical: '#0dcaf0',
  electrical: '#ffc107',
  plumbing: '#20c997',
  firePrevention: '#dc3545',
  architectural: '#6f42c1'
};

const statusColors = {
  notStarted: '#6c757d',
  inProgress: '#ffc107',
  complete: '#28a745',
  onHold: '#dc3545'
};

const clashPriorityColors = {
  critical: '#dc3545',
  high: '#ffc107',
  medium: '#0dcaf0',
  low: '#28a745'
};

/**
 * Initialize all charts on the current page
 */
function initCharts() {
  // Get the current page to determine which charts to initialize
  const currentPage = document.body.getAttribute('data-page');
  
  // Set Chart.js defaults based on current theme
  setChartDefaults();
  
  // Initialize the appropriate charts based on current page
  if (currentPage === 'dashboard' || currentPage === 'index') {
    initProgressTrendChart();
    initStatusDistributionChart();
    initSystemProgressChart();
  } else if (currentPage === 'reports') {
    initProgressTrendChart();
    initStatusDistributionChart();
    initSystemProgressChart();
  } else if (currentPage === 'clash-detection') {
    initClashSummaryByPriorityChart();
    initClashSummaryByTypeChart();
  }
  
  // Bind theme change event to update chart themes
  document.addEventListener('themeChanged', function(e) {
    updateChartsTheme();
  });
}

/**
 * Set Chart.js global defaults based on current theme
 */
function setChartDefaults() {
  const isDarkTheme = document.documentElement.getAttribute('data-theme') === 'dark';
  const textColor = isDarkTheme ? '#f8f9fa' : '#212529';
  const gridColor = isDarkTheme ? 'rgba(255, 255, 255, 0.1)' : 'rgba(0, 0, 0, 0.1)';
  
  // Set global Chart.js defaults
  Chart.defaults.color = textColor;
  Chart.defaults.borderColor = gridColor;
  
  // Set tooltip defaults
  if (Chart.defaults.plugins && Chart.defaults.plugins.tooltip) {
    Chart.defaults.plugins.tooltip.backgroundColor = isDarkTheme ? '#343a40' : '#fff';
    Chart.defaults.plugins.tooltip.titleColor = isDarkTheme ? '#f8f9fa' : '#212529';
    Chart.defaults.plugins.tooltip.bodyColor = isDarkTheme ? '#f8f9fa' : '#212529';
    Chart.defaults.plugins.tooltip.borderColor = isDarkTheme ? '#495057' : '#ddd';
    Chart.defaults.plugins.tooltip.borderWidth = 1;
  }
  
  // Set legend defaults
  if (Chart.defaults.plugins && Chart.defaults.plugins.legend) {
    Chart.defaults.plugins.legend.labels = Chart.defaults.plugins.legend.labels || {};
    Chart.defaults.plugins.legend.labels.color = textColor;
  }
  
  // Set radar chart defaults - with version compatibility check
  if (Chart.defaults.scales && Chart.defaults.scales.r) {
    if (Chart.defaults.scales.r.angleLines) {
      Chart.defaults.scales.r.angleLines.color = gridColor;
    }
    if (Chart.defaults.scales.r.grid) {
      Chart.defaults.scales.r.grid.color = gridColor;
    }
    if (Chart.defaults.scales.r.pointLabels) {
      Chart.defaults.scales.r.pointLabels.color = textColor;
    }
    if (Chart.defaults.scales.r.ticks) {
      Chart.defaults.scales.r.ticks.color = textColor;
    }
  } else if (Chart.defaults.scale && Chart.defaults.scale.angleLines) {
    // For older versions of Chart.js
    Chart.defaults.scale.angleLines.color = gridColor;
    Chart.defaults.scale.gridLines.color = gridColor;
  }
}

/**
 * Update all active charts when theme changes
 */
function updateChartsTheme() {
  setChartDefaults();
  
  // Update each active chart
  Object.values(charts).forEach(chart => {
    if (chart) {
      chart.update();
    }
  });
}

/**
 * Initialize the Progress Trend Chart
 */
function initProgressTrendChart() {
  const ctx = document.getElementById('progressTrendChart');
  if (!ctx) return;
  
  // Get data - this would be replaced with API call in production
  const data = getProgressTrendData();
  
  // Create chart configuration
  const config = {
    type: 'line',
    data: {
      labels: data.labels,
      datasets: [{
        label: 'Overall Progress',
        data: data.values,
        fill: false,
        borderColor: systemColors.structural,
        backgroundColor: systemColors.structural,
        tension: 0.3
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'top',
        },
        tooltip: {
          mode: 'index',
          intersect: false,
          callbacks: {
            label: function(context) {
              return `Progress: ${context.parsed.y}%`;
            }
          }
        },
        title: {
          display: true,
          text: 'Project Progress Over Time'
        }
      },
      scales: {
        x: {
          title: {
            display: true,
            text: 'Date'
          }
        },
        y: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'Completion (%)'
          },
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        }
      }
    }
  };
  
  // Create and store the chart
  charts.progressTrend = new Chart(ctx, config);
}

/**
 * Initialize the Status Distribution Chart
 */
function initStatusDistributionChart() {
  const ctx = document.getElementById('statusDistributionChart');
  if (!ctx) return;
  
  // Get data - this would be replaced with API call in production
  const data = getStatusDistributionData();
  
  // Create chart configuration
  const config = {
    type: 'doughnut',
    data: {
      labels: ['Not Started', 'In Progress', 'Complete', 'On Hold'],
      datasets: [{
        label: 'Elements by Status',
        data: [data.notStarted, data.inProgress, data.complete, data.onHold],
        backgroundColor: [
          statusColors.notStarted,
          statusColors.inProgress,
          statusColors.complete,
          statusColors.onHold
        ],
        borderColor: ['#fff', '#fff', '#fff', '#fff'],
        borderWidth: 1
      }]
    },
    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          position: 'right',
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              const label = context.label || '';
              const value = context.parsed || 0;
              const total = context.dataset.data.reduce((a, b) => a + b, 0);
              const percentage = Math.round((value / total) * 100);
              return `${label}: ${percentage}% (${value} elements)`;
            }
          }
        }
      },
      cutout: '60%'
    }
  };
  
  // Create and store the chart
  charts.statusDistribution = new Chart(ctx, config);
}

/**
 * Initialize the System Progress Chart
 */
function initSystemProgressChart() {
  const ctx = document.getElementById('systemProgressChart');
  if (!ctx) return;
  
  // Get data - this would be replaced with API call in production
  const data = getSystemProgressData();
  
  // Create chart configuration
  const config = {
    type: 'bar',
    data: {
      labels: ['Structural', 'Mechanical', 'Electrical', 'Plumbing', 'Fire Prevention', 'Architectural'],
      datasets: [{
        label: 'Progress by System',
        data: [
          data.structural, 
          data.mechanical, 
          data.electrical, 
          data.plumbing, 
          data.firePrevention, 
          data.architectural
        ],
        backgroundColor: [
          systemColors.structural,
          systemColors.mechanical,
          systemColors.electrical,
          systemColors.plumbing,
          systemColors.firePrevention,
          systemColors.architectural
        ],
        borderWidth: 0
      }]
    },
    options: {
      indexAxis: 'y',
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false
        },
        tooltip: {
          callbacks: {
            label: function(context) {
              return `Progress: ${context.parsed.x}%`;
            }
          }
        }
      },
      scales: {
        x: {
          beginAtZero: true,
          max: 100,
          title: {
            display: true,
            text: 'Completion (%)'
          },
          ticks: {
            callback: function(value) {
              return value + '%';
            }
          }
        }
      }
    }
  };
  
  // Create and store the chart
  charts.systemProgress = new Chart(ctx, config);
}

// Remaining chart functions (initClashSummaryByPriorityChart, initClashSummaryByTypeChart, etc.)
// would follow the same pattern...

/* Mock data functions - would be replaced with API calls in production */

/**
 * Get progress trend data
 * @returns {Object} Progress trend data
 */
function getProgressTrendData() {
  return {
    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep'],
    values: [0, 5, 8, 12, 17, 25, 32, 40, 45]
  };
}

/**
 * Get status distribution data
 * @returns {Object} Status distribution data
 */
function getStatusDistributionData() {
  return {
    notStarted: 30,
    inProgress: 45,
    complete: 20,
    onHold: 5
  };
}

/**
 * Get system progress data
 * @returns {Object} System progress data
 */
function getSystemProgressData() {
  return {
    structural: 11,
    mechanical: 17,
    electrical: 17,
    plumbing: 25,
    firePrevention: 0,
    architectural: 13
  };
}

/**
 * Get clash priority data
 * @returns {Object} Clash priority data
 */
function getClashPriorityData() {
  return {
    critical: 5,
    high: 12,
    medium: 8,
    low: 3
  };
}

/**
 * Get clash type data
 * @returns {Object} Clash type data
 */
function getClashTypeData() {
  return {
    labels: [
      'Structural vs Mechanical', 
      'Structural vs Electrical', 
      'Mechanical vs Electrical', 
      'Plumbing vs Structural',
      'Plumbing vs Mechanical'
    ],
    values: [8, 5, 7, 4, 4]
  };
}

// Initialize charts when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
  // Initialize charts
  initCharts();
  
  // Add event listeners for chart download buttons
  const downloadButtons = document.querySelectorAll('.download-chart');
  downloadButtons.forEach(button => {
    button.addEventListener('click', function() {
      const chartId = this.getAttribute('data-chart-id');
      const filename = this.getAttribute('data-filename') || 'chart.png';
      downloadChart(chartId, filename);
    });
  });
  
  // Add event listener for refresh charts button
  const refreshChartsBtn = document.getElementById('refreshChartsBtn');
  if (refreshChartsBtn) {
    refreshChartsBtn.addEventListener('click', refreshCharts);
  }
});

// Function to download chart as image
function downloadChart(chartId, filename) {
  const canvas = document.getElementById(chartId);
  if (!canvas) return;
  
  // Create a temporary link element
  const link = document.createElement('a');
  link.download = filename || 'chart.png';
  
  // Convert canvas to data URL and set as link href
  link.href = canvas.toDataURL('image/png');
  
  // Append to document, click to download, then remove
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}

// Function to refresh charts
function refreshCharts() {
  // Simulate refreshing with new data
  if (charts.progressTrend) {
    charts.progressTrend.data.datasets[0].data = [5, 10, 15, 20, 25, 30, 35, 40, 45];
    charts.progressTrend.update();
  }
  
  if (charts.statusDistribution) {
    charts.statusDistribution.data.datasets[0].data = [25, 50, 20, 5];
    charts.statusDistribution.update();
  }
  
  if (charts.systemProgress) {
    charts.systemProgress.data.datasets[0].data = [15, 20, 25, 30, 5, 15];
    charts.systemProgress.update();
  }
  
  // Show success message
  showToast('Charts refreshed with latest data!', 'success');
}

// Helper function to show a toast notification
function showToast(message, type = 'info') {
  // Check if toast container exists, create if not
  let toastContainer = document.querySelector('.toast-container');
  if (!toastContainer) {
    toastContainer = document.createElement('div');
    toastContainer.className = 'toast-container position-fixed bottom-0 end-0 p-3';
    document.body.appendChild(toastContainer);
  }
  
  // Create a unique ID for this toast
  const toastId = 'toast-' + Date.now();
  
  // Create toast element
  const toastHtml = `
    <div id="${toastId}" class="toast align-items-center text-white bg-${type}" role="alert" aria-live="assertive" aria-atomic="true">
      <div class="d-flex">
        <div class="toast-body">
          ${message}
        </div>
        <button type="button" class="btn-close btn-close-white me-2 m-auto" data-bs-dismiss="toast" aria-label="Close"></button>
      </div>
    </div>
  `;
  
  // Add toast to container
  toastContainer.innerHTML += toastHtml;
  
  // Initialize the Bootstrap toast and show it
  const toastElement = document.getElementById(toastId);
  const toast = new bootstrap.Toast(toastElement, {
    autohide: true,
    delay: 5000
  });
  
  toast.show();
  
  // Remove toast from DOM after it's hidden
  toastElement.addEventListener('hidden.bs.toast', function() {
    toastElement.remove();
  });
}

// Export functions for use in other scripts
window.gcVDC = window.gcVDC || {};
Object.assign(window.gcVDC, {
  initCharts,
  refreshCharts,
  downloadChart,
  showToast
});