export function createUniqueAccount() {
    return Math.random().toString(36).substring(2, 15).toUpperCase(); // Random 13-character 
}