/** Worldbuilding Manager - Optimized v1.0 | MIT License */
const WB = {
  state: null,
  config: { storageKey: 'wbState', toastDuration: 3000 },
  
  INITIAL: {
    conceit: 'Mi Mundo',
    categorias: {
      'Geología': [
        { id: 1, pregunta: '¿Cuál es la estructura geológica principal?', respuesta: '', completada: false },
        { id: 2, pregunta: '¿Qué recursos naturales abundan?', respuesta: '', completada: false },
        { id: 3, pregunta: '¿Existen fenómenos geológicos únicos?', respuesta: '', completada: false }
      ],
      'Biología': [
        { id: 4, pregunta: '¿Qué formas de vida dominan?', respuesta: '', completada: false },
        { id: 5, pregunta: '¿Existen especies endémicas?', respuesta: '', completada: false },
        { id: 6, pregunta: '¿Cómo es la cadena alimenticia?', respuesta: '', completada: false }
      ],
      'Física/Magia': [
        { id: 7, pregunta: '¿Qué leyes físicas rigen este mundo?', respuesta: '', completada: false },
        { id: 8, pregunta: '¿Existe la magia? ¿Cómo funciona?', respuesta: '', completada: false },
        { id: 9, pregunta: '¿Hay limitaciones o costes por usar magia/tecnología?', respuesta: '', completada: false }
      ],
      'Metafísica': [
        { id: 10, pregunta: '¿Existen deidades o seres superiores?', respuesta: '', completada: false },
        { id: 11, pregunta: '¿Cómo se explica el origen del mundo?', respuesta: '', completada: false },
        { id: 12, pregunta: '¿Qué hay después de la muerte?', respuesta: '', completada: false }
      ],
      'Tecnología': [
        { id: 13, pregunta: '¿Cuál es el nivel tecnológico?', respuesta: '', completada: false },
        { id: 14, pregunta: '¿Qué inventos son únicos de este mundo?', respuesta: '', completada: false },
        { id: 15, pregunta: '¿Cómo afecta la tecnología a la sociedad?', respuesta: '', completada: false }
      ],
      'Cultura': [
        { id: 16, pregunta: '¿Qué valores son importantes?', respuesta: '', completada: false },
        { id: 17, pregunta: '¿Cómo son las tradiciones y festividades?', respuesta: '', completada: false },
        { id: 18, pregunta: '¿Existen conflictos culturales?', respuesta: '', completada: false }
      ]
    }
  },

  saveState() {
    try {
      localStorage.setItem(this.config.storageKey, JSON.stringify(this.state));
      this.showToast('Estado guardado', 'success');
    } catch (e) {
      console.error('Error guardando:', e);
      this.showToast('Error al guardar', 'error');
    }
  },

  loadState() {
    try {
      const s = localStorage.getItem(this.config.storageKey);
      if (!s) return this.INITIAL;
      const p = JSON.parse(s);
      return this.isValidState(p) ? p : this.INITIAL;
    } catch (e) {
      console.error('Error cargando:', e);
      return this.INITIAL;
    }
  },

  isValidState(o) {
    if (typeof o != 'object' || o === null) return false;
    if (typeof o.conceit != 'string') return false;
    if (typeof o.categorias != 'object' || o.categorias === null) return false;
    const c = Object.keys(o.categorias);
    if (c.length === 0) return false;
    for (const cat of c) {
      const items = o.categorias[cat];
      if (!Array.isArray(items)) return false;
      for (const item of items) if (!this.isValidItem(item)) return false;
    }
    return true;
  },

  isValidItem(i) {
    return typeof i == 'object' && i !== null &&
           typeof i.id == 'number' &&
           typeof i.pregunta == 'string' &&
           typeof i.respuesta == 'string' &&
           typeof i.completada == 'boolean';
  },

  resetState() {
    this.state = JSON.parse(JSON.stringify(this.INITIAL));
    localStorage.removeItem(this.config.storageKey);
    this.renderApp();
    this.showToast('Datos restablecidos', 'warning');
  },

  exportState() {
    try {
      const d = JSON.stringify(this.state, null, 2);
      const b = new Blob([d], { type: 'application/json' });
      const u = URL.createObjectURL(b);
      const a = document.createElement('a');
      a.href = u;
      a.download = `wb_${this.state.conceit.replace(/\s+/g, '_')}_${new Date().toISOString().split('T')[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(u);
      this.showToast('Exportado correctamente', 'success');
    } catch (e) {
      console.error('Error exportando:', e);
      this.showToast('Error al exportar', 'error');
    }
  },

  importState(f) {
    const r = new FileReader();
    r.onload = e => {
      try {
        const c = e.target.result;
        const i = JSON.parse(c);
        if (!this.isValidState(i)) {
          this.showToast('Estructura inválida', 'error');
          return;
        }
        this.state = i;
        this.saveState();
        this.renderApp();
        this.showToast('Importado correctamente', 'success');
      } catch (e) {
        console.error('Error importando:', e);
        this.showToast('Archivo JSON inválido', 'error');
      }
    };
    r.onerror = () => this.showToast('Error leyendo archivo', 'error');
    r.readAsText(f);
  },

  renderApp() {
    this.renderConceptInput();
    this.renderCategories();
  },

  renderConceptInput() {
    document.getElementById('conceptInput').value = this.state.conceit;
  },

  renderCategories() {
    const g = document.getElementById('categoriesGrid');
    g.innerHTML = '';
    for (const cat of Object.keys(this.state.categorias)) {
      const items = this.state.categorias[cat];
      const cc = items.filter(i => i.completada).length;
      const card = document.createElement('div');
      card.className = 'category-card';
      card.setAttribute('aria-labelledby', `category-${cat}-title`);
      card.innerHTML = `
        <div class="category-header">
          <span id="category-${cat}-title">${cat}</span>
          <span class="count" aria-label="${cc} de ${items.length} completados">${cc}/${items.length}</span>
        </div>
        <div class="category-content">
          <div class="item-list" id="items-${cat}"></div>
          <div class="add-item-form">
            <input type="text" placeholder="Nueva pregunta..." id="new-question-${cat}" aria-label="Nueva pregunta para ${cat}">
            <button class="btn btn-primary btn-sm" onclick="WB.addItem('${cat}')" aria-label="Añadir pregunta a ${cat}">
              <span>+ Añadir</span>
            </button>
          </div>
        </div>
      `;
      g.appendChild(card);
      this.renderItems(cat);
    }
  },

  renderItems(c) {
    const ic = document.getElementById(`items-${c}`);
    const items = this.state.categorias[c];
    if (items.length === 0) {
      ic.innerHTML = '<div class="empty-state"><p>No hay preguntas en esta categoría</p><p>Añade una usando el formulario de abajo</p></div>';
      return;
    }
    ic.innerHTML = '';
    for (const item of items) {
      const el = document.createElement('div');
      el.className = `item ${item.completada ? 'status-completed' : ''}`;
      el.setAttribute('data-id', item.id);
      el.setAttribute('aria-label', `Pregunta: ${item.pregunta}`);
      el.innerHTML = `
        <div class="item-header">
          <span class="item-question">${item.pregunta}</span>
          <span class="item-status" aria-label="${item.completada ? 'Completada' : 'Pendiente'}"></span>
        </div>
        <textarea class="item-textarea" placeholder="Escribe tu respuesta..." 
                  oninput="WB.updateItemResponse('${c}',${item.id},this.value)" 
                  aria-label="Respuesta a: ${item.pregunta}">${item.respuesta}</textarea>
        <div class="item-actions">
          <button class="btn btn-secondary btn-sm" onclick="WB.toggleItemCompleted('${c}',${item.id})" 
                  aria-label="Marcar como ${item.completada ? 'pendiente' : 'completada'}">
            <span>${item.completada ? '✓ Completada' : '✗ Pendiente'}</span>
          </button>
          <button class="btn btn-danger btn-sm" onclick="WB.deleteItem('${c}',${item.id})" aria-label="Eliminar pregunta">
            <span>🗑️ Eliminar</span>
          </button>
        </div>
      `;
      ic.appendChild(el);
    }
  },

  updateConcept(n) {
    this.state.conceit = n;
    this.saveState();
  },

  addItem(c) {
    const i = document.getElementById(`new-question-${c}`);
    const q = i.value.trim();
    if (!q) {
      this.showToast('La pregunta no puede estar vacía', 'warning');
      return;
    }
    const allItems = Object.values(this.state.categorias).flat();
    const newId = Math.max(...allItems.map(i => i.id), 0) + 1;
    this.state.categorias[c].push({ id: newId, pregunta: q, respuesta: '', completada: false });
    this.saveState();
    i.value = '';
    this.renderItems(c);
    this.showToast(`Pregunta añadida a ${c}`, 'success');
  },

  updateItemResponse(c, id, r) {
    const item = this.state.categorias[c].find(i => i.id === id);
    if (item) {
      item.respuesta = r;
      if (r.trim() && !item.completada) item.completada = true;
      else if (!r.trim() && item.completada) item.completada = false;
      this.saveState();
    }
  },

  toggleItemCompleted(c, id) {
    const item = this.state.categorias[c].find(i => i.id === id);
    if (item) {
      item.completada = !item.completada;
      this.saveState();
      this.renderItems(c);
    }
  },

  deleteItem(c, id) {
    if (!confirm('¿Estás seguro de que quieres eliminar esta pregunta?')) return;
    this.state.categorias[c] = this.state.categorias[c].filter(i => i.id !== id);
    this.saveState();
    this.renderItems(c);
    this.showToast('Pregunta eliminada', 'warning');
  },

  showToast(m, t = 'info') {
    const tc = document.getElementById('toastContainer');
    const toast = document.createElement('div');
    toast.className = `toast ${t}`;
    toast.setAttribute('role', 'alert');
    toast.setAttribute('aria-live', 'assertive');
    const icons = { success: '✓', error: '✗', warning: '⚠', info: 'ℹ' };
    toast.innerHTML = `
      <span class="toast-icon" aria-hidden="true">${icons[t] || icons.info}</span>
      <span class="toast-message">${m}</span>
    `;
    tc.appendChild(toast);
    setTimeout(() => {
      toast.style.animation = 'slideIn 0.3s ease-out reverse';
      setTimeout(() => toast.remove(), 300);
    }, this.config.toastDuration);
  },

  setupListeners() {
    document.getElementById('conceptInput').addEventListener('input', e => this.updateConcept(e.target.value));
    document.getElementById('exportBtn').addEventListener('click', () => this.exportState());
    document.getElementById('importBtn').addEventListener('click', () => document.getElementById('fileInput').click());
    document.getElementById('fileInput').addEventListener('change', e => {
      const f = e.target.files[0];
      if (f) { this.importState(f); e.target.value = ''; }
    });
    document.getElementById('resetBtn').addEventListener('click', () => {
      if (confirm('¿Estás seguro de que quieres restablecer todos los datos? Esta acción no se puede deshacer.'))
        this.resetState();
    });
  },

  init() {
    this.state = this.loadState();
    this.renderApp();
    this.setupListeners();
  }
};

// Initialize app when DOM is ready
document.addEventListener('DOMContentLoaded', () => WB.init());

// Make functions globally available for HTML onclick handlers
window.WB = WB;
