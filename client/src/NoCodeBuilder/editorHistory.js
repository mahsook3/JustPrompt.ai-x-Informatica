class EditorHistory {
    constructor() {
        this.states = [];
        this.currentIndex = -1;
        this.maxStates = 100;
    }

    push(state) {
        // Remove all states after current index if we're in middle of history
        this.states = this.states.slice(0, this.currentIndex + 1);
        
        // Add new state
        this.states.push({ ...state });
        
        // Remove oldest state if we exceed maxStates
        if (this.states.length > this.maxStates) {
            this.states.shift();
        } else {
            this.currentIndex++;
        }
    }

    canUndo() {
        return this.currentIndex > 0;
    }

    canRedo() {
        return this.currentIndex < this.states.length - 1;
    }

    undo() {
        if (!this.canUndo()) return null;
        this.currentIndex--;
        return { ...this.states[this.currentIndex] };
    }

    redo() {
        if (!this.canRedo()) return null;
        this.currentIndex++;
        return { ...this.states[this.currentIndex] };
    }

    getCurrentState() {
        if (this.currentIndex === -1) return null;
        return { ...this.states[this.currentIndex] };
    }

    clear() {
        this.states = [];
        this.currentIndex = -1;
    }
}

export default EditorHistory;