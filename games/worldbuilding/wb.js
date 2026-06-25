/**
 * Worldbuilding Manager - Single Page Application
 * 
 * A minimalist SPA for managing worldbuilding data with the following features:
 * - State management with localStorage persistence
 * - JSON export/import with validation
 * - Toast notifications for user feedback
 * - Responsive design for mobile and desktop
 * - Accessibility support with ARIA attributes
 * 
 * Author: Worldbuilding Manager
 * License: MIT
 */

// ============================================
// INITIAL STATE AND CONFIGURATION
// ============================================

/**
 * INITIAL_STATE - The default state structure for the application
 * 
 * This object defines the initial structure of the worldbuilding data.
 * It contains:
 * - conceit: A string representing the name of the world/concept
 * - categorias: An object where each key is a category name, and the value
 *   is an array of items. Each item has:
 *   - id: Unique numeric identifier
 *   - pregunta: The question/prompt string
 *   - respuesta: The answer string (initially empty)
 *   - completada: Boolean indicating if the item is completed
 * 
 * This structure is used to initialize the application state when
 * localStorage is empty or contains invalid data.
 */
const INITIAL_STATE = {
    conceit: "Mi Mundo",
    categorias: {
        "Geología": [
            { id: 1, pregunta: "¿Cuál es la estructura geológica principal?", respuesta: "", completada: false },
            { id: 2, pregunta: "¿Qué recursos naturales abundan?", respuesta: "", completada: false },
            { id: 3, pregunta: "¿Existen fenómenos geológicos únicos?", respuesta: "", completada: false }
        ],
        "Biología": [
            { id: 4, pregunta: "¿Qué formas de vida dominan?", respuesta: "", completada: false },
            { id: 5, pregunta: "¿Existen especies endémicas?", respuesta: "", completada: false },
            { id: 6, pregunta: "¿Cómo es la cadena alimenticia?", respuesta: "", completada: false }
        ],
        "Física/Magia": [
            { id: 7, pregunta: "¿Qué leyes físicas rigen este mundo?", respuesta: "", completada: false },
            { id: 8, pregunta: "¿Existe la magia? ¿Cómo funciona?", respuesta: "", completada: false },
            { id: 9, pregunta: "¿Hay limitaciones o costes por usar magia/tecnología?", respuesta: "", completada: false }
        ],
        "Metafísica": [
            { id: 10, pregunta: "¿Existen deidades o seres superiores?", respuesta: "", completada: false },
            { id: 11, pregunta: "¿Cómo se explica el origen del mundo?", respuesta: "", completada: false },
            { id: 12, pregunta: "¿Qué hay después de la muerte?", respuesta: "", completada: false }
        ],
        "Tecnología": [
            { id: 13, pregunta: "¿Cuál es el nivel tecnológico?", respuesta: "", completada: false },
            { id: 14, pregunta: "¿Qué inventos son únicos de este mundo?", respuesta: "", completada: false },
            { id: 15, pregunta: "¿Cómo afecta la tecnología a la sociedad?", respuesta: "", completada: false }
        ],
        "Cultura": [
            { id: 16, pregunta: "¿Qué valores son importantes?", respuesta: "", completada: false },
            { id: 17, pregunta: "¿Cómo son las tradiciones y festividades?", respuesta: "", completada: false },
            { id: 18, pregunta: "¿Existen conflictos culturales?", respuesta: "", completada: false }
        ]
    }
};

// ============================================
// APPLICATION STATE
// ============================================

/**
 * state - The current state of the application
 * This is initialized with a deep copy of INITIAL_STATE
 * and will be updated as the user interacts with the app.
 */
let state = { ...INITIAL_STATE };

// ============================================
// STATE MANAGEMENT FUNCTIONS
// ============================================

/**
 * saveState() - Saves the current state to localStorage
 * 
 * SYNCHRONIZATION LOGIC:
 * This function is called after every state modification to ensure
 * data persistence. It uses JSON.stringify to serialize the state
 * object and stores it in localStorage under the key 'worldbuildingState'.
 * 
 * Error handling: If saving fails (e.g., localStorage is full or
 * not available), it logs the error and shows a toast notification.
 * 
 * Note: This provides automatic synchronization between the app state
 * and persistent storage on every user interaction.
 */
function saveState() {
    try {
        localStorage.setItem('worldbuildingState', JSON.stringify(state));
        showToast('Estado guardado correctamente', 'success');
    } catch (error) {
        console.error('Error al guardar el estado:', error);
        showToast('Error al guardar el estado', 'error');
    }
}

/**
 * loadState() - Loads the state from localStorage
 * 
 * STATE LOADING LOGIC:
 * This function is called when the application starts to load
 * the previously saved state. It:
 * 1. Attempts to retrieve the saved state from localStorage
 * 2. If no state exists, returns the INITIAL_STATE
 * 3. If state exists, parses it and validates the structure
 * 4. If validation fails, returns INITIAL_STATE as fallback
 * 
 * This ensures the app always has valid data to work with,
 * even if the saved data is corrupted or incomplete.
 * 
 * @returns {Object} The loaded state or INITIAL_STATE if loading fails
 */
function loadState() {
    try {
        const savedState = localStorage.getItem('worldbuildingState');
        
        // If no saved state exists, return initial state
        if (!savedState) {
            return INITIAL_STATE;
        }

        // Parse the saved state
        const parsedState = JSON.parse(savedState);
        
        // Validate the state structure before using it
        if (!isValidState(parsedState)) {
            console.warn('Estado guardado inválido, usando estado inicial');
            return INITIAL_STATE;
        }

        return parsedState;
    } catch (error) {
        console.error('Error al cargar el estado:', error);
        return INITIAL_STATE;
    }
}

/**
 * isValidState(obj) - Validates that an object has the expected state structure
 * 
 * VALIDATION LOGIC:
 * This function performs comprehensive validation of the state structure:
 * 1. Checks that the object is a valid object (not null, not array)
 * 2. Verifies the presence and type of 'conceit' property (must be string)
 * 3. Verifies the presence and type of 'categorias' property (must be object)
 * 4. Ensures there is at least one category
 * 5. Validates each category's items array and each item within it
 * 
 * This validation is used both when loading saved state and when
 * importing JSON files to ensure data integrity.
 * 
 * @param {Object} obj - The object to validate
 * @returns {boolean} - True if the object is a valid state, false otherwise
 */
function isValidState(obj) {
    // Check if it's a valid object
    if (typeof obj !== 'object' || obj === null) {
        return false;
    }

    // Check for required 'conceit' property (must be string)
    if (typeof obj.conceit !== 'string') {
        return false;
    }

    // Check for required 'categorias' property (must be object)
    if (typeof obj.categorias !== 'object' || obj.categorias === null) {
        return false;
    }

    // Check that there is at least one category
    const categories = Object.keys(obj.categorias);
    if (categories.length === 0) {
        return false;
    }

    // Validate each category and its items
    for (const category of categories) {
        const items = obj.categorias[category];
        
        // Each category must have an array of items
        if (!Array.isArray(items)) {
            return false;
        }

        // Validate each item in the category
        for (const item of items) {
            if (!isValidItem(item)) {
                return false;
            }
        }
    }

    return true;
}

/**
 * isValidItem(item) - Validates that an item has the expected structure
 * 
 * ITEM VALIDATION LOGIC:
 * Each item must be an object with:
 * - id: number (unique identifier)
 * - pregunta: string (the question/prompt)
 * - respuesta: string (the answer, can be empty)
 * - completada: boolean (completion status)
 * 
 * @param {Object} item - The item to validate
 * @returns {boolean} - True if the item is valid, false otherwise
 */
function isValidItem(item) {
    return (
        typeof item === 'object' &&
        item !== null &&
        typeof item.id === 'number' &&
        typeof item.pregunta === 'string' &&
        typeof item.respuesta === 'string' &&
        typeof item.completada === 'boolean'
    );
}

/**
 * resetState() - Resets the application state to initial values
 * 
 * RESET LOGIC:
 * This function:
 * 1. Creates a deep copy of INITIAL_STATE to avoid reference issues
 * 2. Removes the saved state from localStorage
 * 3. Re-renders the entire application with the initial state
 * 4. Shows a warning toast to inform the user
 * 
 * Note: This action cannot be undone, so it should be confirmed by the user.
 */
function resetState() {
    // Create a deep copy of the initial state
    state = JSON.parse(JSON.stringify(INITIAL_STATE));
    localStorage.removeItem('worldbuildingState');
    renderApp();
    showToast('Datos restablecidos', 'warning');
}

// ============================================
// EXPORT AND IMPORT FUNCTIONS
// ============================================

/**
 * exportState() - Exports the current state as a downloadable JSON file
 * 
 * EXPORT LOGIC:
 * This function uses the Blob API and URL.createObjectURL to generate
 * a downloadable JSON file containing the current state. The process:
 * 1. Stringifies the state with pretty printing (2-space indentation)
 * 2. Creates a Blob with the JSON data and appropriate MIME type
 * 3. Generates a download URL using URL.createObjectURL
 * 4. Creates a temporary anchor element to trigger the download
 * 5. Cleans up by revoking the object URL after download
 * 
 * The filename includes the concept name and current date for uniqueness.
 */
function exportState() {
    try {
        // Stringify the state with indentation for readability
        const dataStr = JSON.stringify(state, null, 2);
        
        // Create a Blob with the JSON data
        const blob = new Blob([dataStr], { type: 'application/json' });
        
        // Create a download URL
        const url = URL.createObjectURL(blob);
        
        // Create a temporary anchor element
        const a = document.createElement('a');
        a.href = url;
        
        // Generate filename with concept name and date
        a.download = `worldbuilding_${state.conceit.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
        
        // Trigger the download
        document.body.appendChild(a);
        a.click();
        document.body.removeChild(a);
        
        // Clean up the object URL
        URL.revokeObjectURL(url);
        
        // Show success feedback
        showToast('Datos exportados correctamente', 'success');
    } catch (error) {
        console.error('Error al exportar:', error);
        showToast('Error al exportar datos', 'error');
    }
}

/**
 * importState(file) - Imports data from a JSON file
 * 
 * IMPORT LOGIC WITH VALIDATION:
 * This function handles file import with comprehensive validation:
 * 1. Uses FileReader to read the file content as text
 * 2. Parses the text as JSON
 * 3. Validates the parsed JSON against the expected state structure
 *    using isValidState()
 * 4. If validation fails, aborts the operation and shows an error
 * 5. If validation passes, updates the state, saves to localStorage,
 *    and re-renders the application
 * 
 * FILE VALIDATION:
 * The validation ensures that the imported JSON has:
 * - The correct overall structure (conceit + categorias)
 * - Valid categories with arrays of valid items
 * - All required properties with correct types
 * 
 * If any validation fails, the operation is aborted and the user
 * is informed with a clear error message.
 * 
 * @param {File} file - The file to import
 */
function importState(file) {
    const reader = new FileReader();
    
    reader.onload = function(e) {
        try {
            // Get the file content
            const content = e.target.result;
            
            // Parse as JSON
            const importedState = JSON.parse(content);
            
            // VALIDATION: Check if the imported JSON has the correct structure
            if (!isValidState(importedState)) {
                showToast('El archivo no tiene la estructura válida de Worldbuilding', 'error');
                return; // Abort operation if validation fails
            }

            // Additional validation: Check if categories match expected ones
            // (This is optional and allows for flexibility in category names)
            const expectedCategories = Object.keys(INITIAL_STATE.categorias);
            const importedCategories = Object.keys(importedState.categorias);
            
            // For this implementation, we allow any valid category structure
            // but you could add stricter validation here if needed
            
            // Update the state with imported data
            state = importedState;
            
            // Save to localStorage
            saveState();
            
            // Re-render the application
            renderApp();
            
            // Show success feedback
            showToast('Datos importados correctamente', 'success');
            
        } catch (error) {
            console.error('Error al importar:', error);
            showToast('Error al importar: archivo JSON inválido', 'error');
        }
    };

    reader.onerror = function() {
        showToast('Error al leer el archivo', 'error');
    };

    // Start reading the file
    reader.readAsText(file);
}

// ============================================
// RENDERING FUNCTIONS
// ============================================

/**
 * renderApp() - Renders the entire application
 * 
 * This function triggers a full re-render of the application
 * by calling the individual rendering functions for each component.
 */
function renderApp() {
    renderConceptInput();
    renderCategories();
}

/**
 * renderConceptInput() - Renders the concept input field
 * 
 * Updates the concept input value to match the current state.
 */
function renderConceptInput() {
    const conceptInput = document.getElementById('conceptInput');
    conceptInput.value = state.conceit;
}

/**
 * renderCategories() - Renders all category cards
 * 
 * This function:
 * 1. Clears the categories grid container
 * 2. Iterates through each category in the state
 * 3. Creates a card for each category with its header and content
 * 4. Renders the items for each category
 * 5. Adds the category card to the grid
 */
function renderCategories() {
    const categoriesGrid = document.getElementById('categoriesGrid');
    categoriesGrid.innerHTML = '';
    
    const categories = Object.keys(state.categorias);
    
    for (const category of categories) {
        const items = state.categorias[category];
        const completedCount = items.filter(item => item.completada).length;
        
        // Create category card element
        const categoryCard = document.createElement('div');
        categoryCard.className = 'category-card';
        categoryCard.setAttribute('aria-labelledby', `category-${category}-title`);
        
        // Set category card HTML
        categoryCard.innerHTML = `
            <div class="category-header">
                <span id="category-${category}-title">${category}</span>
                <span class="count" aria-label="${completedCount} de ${items.length} completados">${completedCount}/${items.length}</span>
            </div>
            <div class="category-content">
                <div class="item-list" id="items-${category}"></div>
                <div class="add-item-form">
                    <input 
                        type="text" 
                        placeholder="Nueva pregunta..." 
                        id="new-question-${category}"
                        aria-label="Nueva pregunta para ${category}"
                    >
                    <button 
                        class="btn btn-primary btn-sm" 
                        onclick="addItem('${category}')"
                        aria-label="Añadir pregunta a ${category}"
                    >
                        <span>+ Añadir</span>
                    </button>
                </div>
            </div>
        `;
        
        categoriesGrid.appendChild(categoryCard);
        
        // Render items for this category
        renderItems(category);
    }
}

/**
 * renderItems(category) - Renders all items for a specific category
 * 
 * This function:
 * 1. Gets the container for the category's items
 * 2. If there are no items, shows an empty state message
 * 3. Otherwise, creates an element for each item with:
 *    - Question header with status indicator
 *    - Textarea for the answer
 *    - Action buttons (toggle complete, delete)
 * 4. Adds event handlers for user interactions
 * 
 * @param {string} category - The category to render items for
 */
function renderItems(category) {
    const itemsContainer = document.getElementById(`items-${category}`);
    const items = state.categorias[category];
    
    // Show empty state if no items
    if (items.length === 0) {
        itemsContainer.innerHTML = `
            <div class="empty-state">
                <p>No hay preguntas en esta categoría</p>
                <p>Añade una usando el formulario de abajo</p>
            </div>
        `;
        return;
    }
    
    itemsContainer.innerHTML = '';
    
    // Create an element for each item
    for (const item of items) {
        const itemElement = document.createElement('div');
        itemElement.className = `item ${item.completada ? 'status-completed' : ''}`;
        itemElement.setAttribute('data-id', item.id);
        itemElement.setAttribute('aria-label', `Pregunta: ${item.pregunta}`);
        
        itemElement.innerHTML = `
            <div class="item-header">
                <span class="item-question">${item.pregunta}</span>
                <span class="item-status" aria-label="${item.completada ? 'Completada' : 'Pendiente'}"></span>
            </div>
            <textarea 
                class="item-textarea" 
                placeholder="Escribe tu respuesta..."
                oninput="updateItemResponse('${category}', ${item.id}, this.value)"
                aria-label="Respuesta a: ${item.pregunta}"
            >${item.respuesta}</textarea>
            <div class="item-actions">
                <button 
                    class="btn btn-secondary btn-sm" 
                    onclick="toggleItemCompleted('${category}', ${item.id})"
                    aria-label="Marcar como ${item.completada ? 'pendiente' : 'completada'}"
                >
                    <span>${item.completada ? '✓ Completada' : '✗ Pendiente'}</span>
                </button>
                <button 
                    class="btn btn-danger btn-sm" 
                    onclick="deleteItem('${category}', ${item.id})"
                    aria-label="Eliminar pregunta"
                >
                    <span>🗑️ Eliminar</span>
                </button>
            </div>
        `;
        
        itemsContainer.appendChild(itemElement);
    }
}

// ============================================
// DATA MANIPULATION FUNCTIONS
// ============================================

/**
 * updateConcept(newConcept) - Updates the concept name
 * 
 * STATE MANAGEMENT:
 * Updates the conceit property in the state and saves to localStorage.
 * 
 * @param {string} newConcept - The new concept name
 */
function updateConcept(newConcept) {
    state.conceit = newConcept;
    saveState();
}

/**
 * addItem(category) - Adds a new item to a category
 * 
 * STATE MANAGEMENT:
 * This function:
 * 1. Gets the new question from the input field
 * 2. Validates that the question is not empty
 * 3. Generates a unique ID for the new item
 * 4. Creates a new item object with default values
 * 5. Adds the item to the specified category
 * 6. Saves the state and re-renders the category
 * 
 * @param {string} category - The category to add the item to
 */
function addItem(category) {
    const input = document.getElementById(`new-question-${category}`);
    const question = input.value.trim();
    
    if (!question) {
        showToast('La pregunta no puede estar vacía', 'warning');
        return;
    }
    
    // Generate unique ID
    const allItems = Object.values(state.categorias).flat();
    const maxId = allItems.reduce((max, item) => Math.max(max, item.id), 0);
    const newId = maxId + 1;
    
    // Create new item
    const newItem = {
        id: newId,
        pregunta: question,
        respuesta: '',
        completada: false
    };
    
    // Add to category and save
    state.categorias[category].push(newItem);
    saveState();
    
    // Clear input and re-render
    input.value = '';
    renderItems(category);
    showToast(`Pregunta añadida a ${category}`, 'success');
}

/**
 * updateItemResponse(category, id, newResponse) - Updates an item's response
 * 
 * STATE MANAGEMENT:
 * Updates the response for a specific item and automatically
 * toggles the completed status based on whether the response is empty.
 * 
 * @param {string} category - The category containing the item
 * @param {number} id - The ID of the item to update
 * @param {string} newResponse - The new response value
 */
function updateItemResponse(category, id, newResponse) {
    const item = state.categorias[category].find(item => item.id === id);
    if (item) {
        item.respuesta = newResponse;
        
        // Auto-toggle completed status based on response
        if (newResponse.trim() && !item.completada) {
            item.completada = true;
        } else if (!newResponse.trim() && item.completada) {
            item.completada = false;
        }
        
        saveState();
    }
}

/**
 * toggleItemCompleted(category, id) - Toggles the completed status of an item
 * 
 * STATE MANAGEMENT:
 * Inverts the completada property of the specified item and saves the state.
 * 
 * @param {string} category - The category containing the item
 * @param {number} id - The ID of the item to toggle
 */
function toggleItemCompleted(category, id) {
    const item = state.categorias[category].find(item => item.id === id);
    if (item) {
        item.completada = !item.completada;
        saveState();
        renderItems(category);
    }
}

/**
 * deleteItem(category, id) - Deletes an item from a category
 * 
 * STATE MANAGEMENT:
 * Removes the specified item from its category after user confirmation.
 * 
 * @param {string} category - The category containing the item
 * @param {number} id - The ID of the item to delete
 */
function deleteItem(category, id) {
    if (!confirm('¿Estás seguro de que quieres eliminar esta pregunta?')) {
        return;
    }
    
    state.categorias[category] = state.categorias[category].filter(item => item.id !== id);
    saveState();
    renderItems(category);
    showToast('Pregunta eliminada', 'warning');
}

// ============================================
// TOAST NOTIFICATIONS
// ============================================

/**
 * showToast(message, type) - Displays a temporary notification message
 * 
 * TOAST SYSTEM:
 * Creates a temporary notification that:
 * - Appears in the toast container
 * - Has a type-specific color (success, error, warning, info)
 * - Shows an appropriate icon
 * - Auto-removes after 3 seconds
 * - Is accessible with ARIA attributes
 * 
 * @param {string} message - The message to display
 * @param {string} type - The type of toast: 'success', 'error', 'warning', 'info'
 */
function showToast(message, type = 'info') {
    const toastContainer = document.getElementById('toastContainer');
    
    const toast = document.createElement('div');
    toast.className = `toast ${type}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    
    // Icons for different toast types
    const icons = {
        success: '✓',
        error: '✗',
        warning: '⚠',
        info: 'ℹ'
    };
    
    toast.innerHTML = `
        <span class="toast-icon" aria-hidden="true">${icons[type] || icons.info}</span>
        <span class="toast-message">${message}</span>
    `;
    
    toastContainer.appendChild(toast);
    
    // Auto-remove after 3 seconds
    setTimeout(() => {
        toast.style.animation = 'slideIn 0.3s ease-out reverse';
        setTimeout(() => {
            toast.remove();
        }, 300);
    }, 3000);
}

// ============================================
// INITIALIZATION
// ============================================

// Load state from localStorage when the app starts
state = loadState();

// Render the application
renderApp();

// Set up event listeners
document.getElementById('conceptInput').addEventListener('input', (e) => {
    updateConcept(e.target.value);
});

document.getElementById('exportBtn').addEventListener('click', exportState);

document.getElementById('importBtn').addEventListener('click', () => {
    document.getElementById('fileInput').click();
});

document.getElementById('fileInput').addEventListener('change', (e) => {
    const file = e.target.files[0];
    if (file) {
        importState(file);
        // Reset input to allow selecting the same file again
        e.target.value = '';
    }
});

document.getElementById('resetBtn').addEventListener('click', () => {
    if (confirm('¿Estás seguro de que quieres restablecer todos los datos? Esta acción no se puede deshacer.')) {
        resetState();
    }
});

// Make functions globally available for HTML onclick handlers
window.addItem = addItem;
window.updateItemResponse = updateItemResponse;
window.toggleItemCompleted = toggleItemCompleted;
window.deleteItem = deleteItem;
window.showToast = showToast;
