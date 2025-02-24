function normalizeURL(url) {
    if (!url) {
        throw new Error("URL no puede estar vacía");
    }
    
    // Eliminar espacios
    url = url.trim();
    
    // Asegurar que use HTTPS
    if (url.startsWith('http://')) {
        url = url.replace('http://', 'https://');
    } else if (!url.startsWith('https://')) {
        url = 'https://' + url;
    }
    
    // Eliminar slash final si existe
    return url.replace(/\/$/, '');
}

module.exports = { normalizeURL };
