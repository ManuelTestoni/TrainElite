document.addEventListener('alpine:init', () => {
    Alpine.data('workoutBuilder', () => ({
        step: 1,
        // Dati Base Scheda
        editMode: false,
        title: '',
        description: '',
        goal: 'Ipertrofia',
        level: 'Intermedio',
        
        // Assegnazione Cliente (Ricerca AJAX)
        clientSearchQuery: '',
        clientSearchResults: [],
        selectedClient: null,
        
        // Esercizi (Ricerca AJAX)
        exerciseSearchQuery: '',
        exerciseSearchResults: [],
        
        // Giorni di Allenamento
        days: [
            {
                id: 1,
                name: 'Giorno 1',
                exercises: []
            }
        ],
        
        // UI Stato
        isSaving: false,
        draggedExercise: null,
        
        init() {
            // Carica primi esercizi all'avvio
            this.searchExercises();
            
            // Se c'è un dataset di modifica in window (edit mode)
            if (window.WORKOUT_DATA) {
                this.editMode = true;
                this.title = window.WORKOUT_DATA.title || '';
                this.description = window.WORKOUT_DATA.description || '';
                this.goal = window.WORKOUT_DATA.goal || 'Ipertrofia';
                this.level = window.WORKOUT_DATA.level || 'Intermedio';
                this.selectedClient = {
                    id: window.WORKOUT_DATA.client_id,
                    name: window.WORKOUT_DATA.client_name
                };
                if (window.WORKOUT_DATA.days && window.WORKOUT_DATA.days.length > 0) {
                    this.days = window.WORKOUT_DATA.days;
                }
            }
        },
        
        // ----- METODI CLIENTI (AJAX) -----
        async searchClients() {
            if (this.clientSearchQuery.length < 2) {
                this.clientSearchResults = [];
                return;
            }
            try {
                const response = await fetch(`/api/clients/search/?q=${this.clientSearchQuery}`);
                const data = await response.json();
                this.clientSearchResults = data;
            } catch (e) {
                console.error(e);
            }
        },
        
        selectClient(client) {
            this.selectedClient = client;
            this.clientSearchQuery = '';
            this.clientSearchResults = [];
        },
        
        clearClient() {
            this.selectedClient = null;
        },

        // ----- METODI ESERCIZI (AJAX) -----
        async searchExercises() {
            try {
                const response = await fetch(`/api/exercises/search/?q=${this.exerciseSearchQuery}`);
                const data = await response.json();
                this.exerciseSearchResults = data;
            } catch (e) {
                console.error(e);
            }
        },
        
        // ----- BUILDER METODI -----
        addDay() {
            const nextId = this.days.length > 0 ? Math.max(...this.days.map(d => d.id)) + 1 : 1;
            this.days.push({
                id: nextId,
                name: `Giorno ${nextId}`,
                exercises: []
            });
        },
        
        removeDay(index) {
            this.days.splice(index, 1);
        },
        
        addExerciseToDay(dayIndex, exerciseObj) {
            this.days[dayIndex].exercises.push({
                exercise_id: exerciseObj.id,
                name: exerciseObj.name,
                target: exerciseObj.target,
                sets: '4',
                reps: '10',
                rest: '90s',
                notes: ''
            });
        },
        
        removeExercise(dayIndex, exIndex) {
            this.days[dayIndex].exercises.splice(exIndex, 1);
        },
        
        // Helper per passare velocemente da sidebar
        clickToAdd(exercise) {
            if(this.days.length === 0) this.addDay();
            const lastDayIndex = this.days.length - 1;
            this.addExerciseToDay(lastDayIndex, exercise);
        },

        // ----- SUBMIT AL BACKEND -----
        async saveWorkout(status = "ACTIVE") {
            if(!this.title || !this.selectedClient) {
                alert("Completa il Titolo e seleziona un Cliente (Step 1) prima di salvare.");
                this.step = 1;
                return;
            }
            
            this.isSaving = true;
            
            const payload = {
                title: this.title,
                description: this.description,
                goal: this.goal,
                level: this.level, status: status,
                client_id: this.selectedClient.id,
                days: this.days
            };

            try {
                const csrfToken = document.querySelector('[name=csrfmiddlewaretoken]')?.value 
                               || document.cookie.split('; ').find(row => row.startsWith('csrftoken=')).split('=')[1];
                               
                const savedUrl = this.editMode && window.WORKOUT_EDIT_URL 
                                 ? window.WORKOUT_EDIT_URL 
                                 : '/allenamenti/crea/';

                const response = await fetch(savedUrl, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'X-CSRFToken': csrfToken
                    },
                    body: JSON.stringify(payload)
                });
                
                const data = await response.json();
                if(response.ok && data.redirect_url) {
                    window.location.href = data.redirect_url;
                } else {
                    alert("Errore: " + (data.error || "Impossibile salvare la scheda"));
                }
            } catch (e) {
                console.error(e);
                alert("Errore di rete");
            } finally {
                this.isSaving = false;
            }
        }
    }));
});
