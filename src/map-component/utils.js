const generateInfoWindowContent = (marker) => {
  const content = `
      <div class="info-container">
        <p class="info-title">${marker.title}</p>
        <p class="info-description">${marker.description}</p>
      <div>
    `
  return content;
}

export { generateInfoWindowContent };
