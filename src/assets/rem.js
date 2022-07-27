const baseSize = 16

function adjustHtmlFontSize() {
  const scale = document.documentElement.clientWidth / 1536
  document.documentElement.style.fontSize = baseSize * Math.min(scale, 2) + 'px'
  console.log('resize')
}

adjustHtmlFontSize()

window.addEventListener('resize', adjustHtmlFontSize)
