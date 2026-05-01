from django.core.management.base import BaseCommand
from django.utils.text import slugify
from domain.workouts.models import Exercise

# (name, target_muscles, secondary_muscles, equipment, movement_pattern, difficulty_level, exercise_type)
EXERCISES = [
    # ── FORZA / BODYBUILDING ──────────────────────────────────────────────────
    # Petto
    ("Panca piana con bilanciere", "Pettorali", "Tricipiti, Anteriore deltoide", "Bilanciere, Panca", "Spinta orizzontale", "Intermedio", "Forza"),
    ("Panca inclinata con bilanciere", "Pettorali superiori", "Tricipiti, Anteriore deltoide", "Bilanciere, Panca inclinata", "Spinta inclinata", "Intermedio", "Forza"),
    ("Panca declinata con bilanciere", "Pettorali inferiori", "Tricipiti", "Bilanciere, Panca declinata", "Spinta declinata", "Intermedio", "Forza"),
    ("Panca piana con manubri", "Pettorali", "Tricipiti, Anteriore deltoide", "Manubri, Panca", "Spinta orizzontale", "Principiante", "Ipertrofia"),
    ("Croci con manubri", "Pettorali", "Anteriore deltoide", "Manubri, Panca", "Isolamento petto", "Principiante", "Ipertrofia"),
    ("Croci ai cavi", "Pettorali", "Anteriore deltoide", "Cavi", "Isolamento petto", "Principiante", "Ipertrofia"),
    ("Push-up", "Pettorali", "Tricipiti, Core", "Corpo libero", "Spinta orizzontale", "Principiante", "Calistenia"),
    ("Dip alle parallele", "Pettorali inferiori, Tricipiti", "Anteriore deltoide", "Parallele", "Spinta verticale", "Intermedio", "Calistenia"),

    # Schiena
    ("Stacco da terra con bilanciere", "Erettori spinali, Glutei, Femorali", "Trapezio, Romboidi", "Bilanciere", "Tiro dal suolo", "Avanzato", "Forza"),
    ("Trazioni alla sbarra (pronazione)", "Dorsali, Bicipiti", "Romboidi, Trapezio", "Sbarra", "Tiro verticale", "Intermedio", "Calistenia"),
    ("Trazioni alla sbarra (supinazione)", "Dorsali, Bicipiti", "Trapezio", "Sbarra", "Tiro verticale", "Intermedio", "Calistenia"),
    ("Lat machine avanti", "Dorsali", "Bicipiti, Trapezio", "Lat machine", "Tiro verticale", "Principiante", "Ipertrofia"),
    ("Rematore con bilanciere", "Dorsali, Romboidi", "Bicipiti, Erettori", "Bilanciere", "Tiro orizzontale", "Intermedio", "Forza"),
    ("Rematore con manubrio", "Dorsali, Romboidi", "Bicipiti", "Manubrio, Panca", "Tiro orizzontale", "Principiante", "Ipertrofia"),
    ("Rematore ai cavi bassi", "Dorsali, Romboidi", "Bicipiti", "Cavi", "Tiro orizzontale", "Principiante", "Ipertrofia"),
    ("Face pull ai cavi", "Posteriore deltoide, Trapezio", "Romboidi", "Cavi, Corda", "Tiro orizzontale", "Principiante", "Ipertrofia"),
    ("Pulley prona con bilanciere", "Dorsali", "Bicipiti", "Bilanciere, Cavi", "Tiro verticale", "Intermedio", "Ipertrofia"),

    # Spalle
    ("Military press con bilanciere", "Deltoide, Trapezio", "Tricipiti", "Bilanciere", "Spinta verticale", "Intermedio", "Forza"),
    ("Lento avanti con manubri", "Deltoide anteriore", "Tricipiti", "Manubri", "Spinta verticale", "Principiante", "Ipertrofia"),
    ("Alzate laterali con manubri", "Deltoide laterale", "Trapezio superiore", "Manubri", "Abduzione laterale", "Principiante", "Ipertrofia"),
    ("Alzate frontali con manubri", "Deltoide anteriore", "Trapezio", "Manubri", "Flessione spalla", "Principiante", "Ipertrofia"),
    ("Alzate posteriori con manubri", "Deltoide posteriore", "Romboidi", "Manubri", "Estensione orizzontale", "Principiante", "Ipertrofia"),
    ("Alzate laterali ai cavi", "Deltoide laterale", "Trapezio superiore", "Cavi", "Abduzione laterale", "Principiante", "Ipertrofia"),
    ("Scrollate con bilanciere (Shrug)", "Trapezio superiore", "Elevatore scapola", "Bilanciere", "Elevazione scapola", "Principiante", "Ipertrofia"),

    # Tricipiti
    ("French press con bilanciere", "Tricipiti", "Anconeo", "Bilanciere, Panca", "Estensione gomito", "Intermedio", "Ipertrofia"),
    ("Pushdown ai cavi (corda)", "Tricipiti", "Anconeo", "Cavi, Corda", "Estensione gomito", "Principiante", "Ipertrofia"),
    ("Kickback con manubrio", "Tricipiti", None, "Manubrio", "Estensione gomito", "Principiante", "Ipertrofia"),
    ("Skull crusher con manubri", "Tricipiti", None, "Manubri, Panca", "Estensione gomito", "Intermedio", "Ipertrofia"),
    ("Dip alla panca", "Tricipiti", "Pettorali inferiori", "Panca", "Spinta verticale", "Principiante", "Ipertrofia"),

    # Bicipiti
    ("Curl con bilanciere", "Bicipiti", "Brachiale anteriore", "Bilanciere", "Flessione gomito", "Principiante", "Ipertrofia"),
    ("Curl con manubri alternati", "Bicipiti", "Brachiale anteriore", "Manubri", "Flessione gomito", "Principiante", "Ipertrofia"),
    ("Curl a martello con manubri", "Brachioradiale, Bicipiti", None, "Manubri", "Flessione gomito neutrale", "Principiante", "Ipertrofia"),
    ("Curl ai cavi bassi", "Bicipiti", "Brachiale anteriore", "Cavi", "Flessione gomito", "Principiante", "Ipertrofia"),
    ("Curl concentrato", "Bicipiti", None, "Manubrio", "Flessione gomito", "Principiante", "Ipertrofia"),

    # Gambe
    ("Squat con bilanciere", "Quadricipiti, Glutei", "Femorali, Core, Erettori", "Bilanciere, Rack", "Squat", "Intermedio", "Forza"),
    ("Front squat", "Quadricipiti", "Glutei, Core", "Bilanciere, Rack", "Squat", "Avanzato", "Forza"),
    ("Leg press", "Quadricipiti, Glutei", "Femorali", "Leg press machine", "Spinta orizzontale gambe", "Principiante", "Ipertrofia"),
    ("Affondi con bilanciere", "Quadricipiti, Glutei", "Femorali, Core", "Bilanciere", "Affondo", "Intermedio", "Forza"),
    ("Affondi con manubri", "Quadricipiti, Glutei", "Femorali", "Manubri", "Affondo", "Principiante", "Ipertrofia"),
    ("Bulgarian split squat", "Quadricipiti, Glutei", "Femorali, Core", "Manubri, Panca", "Affondo monopodalico", "Intermedio", "Ipertrofia"),
    ("Leg curl sdraiato", "Femorali", "Gastrocnemio", "Leg curl machine", "Flessione ginocchio", "Principiante", "Ipertrofia"),
    ("Romanian deadlift", "Femorali, Glutei", "Erettori spinali", "Bilanciere", "Cerniera fianchi", "Intermedio", "Forza"),
    ("Hip thrust con bilanciere", "Glutei", "Femorali, Quadricipiti", "Bilanciere, Panca", "Estensione fianchi", "Principiante", "Ipertrofia"),
    ("Calf raise in piedi", "Gastrocnemio", "Soleo", "Macchina o corpo libero", "Flessione plantare", "Principiante", "Ipertrofia"),
    ("Calf raise seduto", "Soleo", "Gastrocnemio", "Macchina", "Flessione plantare", "Principiante", "Ipertrofia"),
    ("Hack squat", "Quadricipiti", "Glutei", "Hack squat machine", "Squat", "Intermedio", "Ipertrofia"),
    ("Leg extension", "Quadricipiti", None, "Leg extension machine", "Estensione ginocchio", "Principiante", "Ipertrofia"),
    ("Sumo deadlift", "Glutei, Adduttori, Femorali", "Erettori, Quadricipiti", "Bilanciere", "Tiro dal suolo", "Intermedio", "Forza"),
    ("Good morning", "Erettori spinali, Femorali", "Glutei", "Bilanciere", "Cerniera fianchi", "Intermedio", "Forza"),

    # Core
    ("Crunch", "Retto addominale", "Obliqui", "Corpo libero", "Flessione tronco", "Principiante", "Core"),
    ("Plank", "Core (traverso, retto)", "Spalle, Glutei", "Corpo libero", "Isometria core", "Principiante", "Core"),
    ("Plank laterale", "Obliqui", "Glutei, Spalle", "Corpo libero", "Isometria laterale", "Principiante", "Core"),
    ("Russian twist", "Obliqui", "Retto addominale", "Corpo libero o disco", "Rotazione tronco", "Principiante", "Core"),
    ("Hanging leg raise", "Retto addominale inferiore", "Flessori anca", "Sbarra", "Flessione fianchi", "Intermedio", "Core"),
    ("Ab wheel rollout", "Retto addominale, Core", "Dorsali, Spalle", "Ab wheel", "Estensione core", "Avanzato", "Core"),
    ("Dead bug", "Core trasverso", "Erettori", "Corpo libero", "Stabilizzazione core", "Principiante", "Core"),
    ("Bird dog", "Core, Erettori", "Glutei, Spalle", "Corpo libero", "Stabilizzazione core", "Principiante", "Core"),

    # ── POWERLIFTING ─────────────────────────────────────────────────────────
    ("Paused squat", "Quadricipiti, Glutei", "Core, Erettori", "Bilanciere, Rack", "Squat con pausa", "Avanzato", "Powerlifting"),
    ("Box squat", "Glutei, Femorali, Quadricipiti", "Core", "Bilanciere, Box", "Squat con box", "Intermedio", "Powerlifting"),
    ("Deficit deadlift", "Erettori, Femorali, Glutei", "Trapezio, Core", "Bilanciere, Rialzo", "Tiro dal suolo", "Avanzato", "Powerlifting"),
    ("Rack pull", "Trapezio, Dorsali", "Glutei, Erettori", "Bilanciere, Rack", "Tiro parziale", "Intermedio", "Powerlifting"),
    ("Board press", "Pettorali, Tricipiti", "Anteriore deltoide", "Bilanciere, Board", "Spinta parziale", "Avanzato", "Powerlifting"),

    # ── WEIGHTLIFTING OLIMPICO ────────────────────────────────────────────────
    ("Clean & Jerk", "Tutto il corpo", "Quadricipiti, Glutei, Spalle, Core", "Bilanciere", "Sollevamento olimpico", "Avanzato", "Olimpico"),
    ("Snatch", "Tutto il corpo", "Glutei, Dorsali, Spalle", "Bilanciere", "Sollevamento olimpico", "Avanzato", "Olimpico"),
    ("Power clean", "Quadricipiti, Glutei, Trapezio", "Core, Dorsali", "Bilanciere", "Pull + rack", "Avanzato", "Olimpico"),
    ("Hang power clean", "Quadricipiti, Glutei", "Core, Trapezio", "Bilanciere", "Pull + rack da sospeso", "Intermedio", "Olimpico"),
    ("Push press", "Spalle, Tricipiti", "Core, Gambe", "Bilanciere", "Spinta con impulso gambe", "Intermedio", "Olimpico"),

    # ── CALISTENIA / GINNASTICA ───────────────────────────────────────────────
    ("Muscle up alla sbarra", "Dorsali, Pettorali, Tricipiti", "Bicipiti, Core", "Sbarra", "Tiro + spinta", "Avanzato", "Calistenia"),
    ("L-sit", "Core, Flessori anca", "Tricipiti, Spalle", "Parallele o corpo libero", "Isometria core", "Avanzato", "Calistenia"),
    ("Front lever", "Dorsali, Core", "Bicipiti, Spalle", "Sbarra", "Isometria orizzontale", "Avanzato", "Calistenia"),
    ("Back lever", "Pettorali, Bicipiti, Core", "Dorsali", "Sbarra o anelli", "Isometria orizzontale", "Avanzato", "Calistenia"),
    ("Handstand push-up", "Spalle, Tricipiti", "Core, Trapezio", "Muro o corpo libero", "Spinta verticale invertita", "Avanzato", "Calistenia"),
    ("Pistol squat", "Quadricipiti, Glutei", "Core, Caviglia", "Corpo libero", "Squat monopodalico", "Avanzato", "Calistenia"),
    ("Pike push-up", "Spalle, Tricipiti", "Core", "Corpo libero", "Spinta verticale", "Intermedio", "Calistenia"),
    ("Archer push-up", "Pettorali, Tricipiti", "Bicipiti, Core", "Corpo libero", "Spinta asimmetrica", "Intermedio", "Calistenia"),

    # ── FUNCTIONAL / CROSSFIT ────────────────────────────────────────────────
    ("Kettlebell swing", "Glutei, Femorali", "Core, Dorsali", "Kettlebell", "Cerniera fianchi esplosiva", "Principiante", "Funzionale"),
    ("Kettlebell goblet squat", "Quadricipiti, Glutei", "Core, Spalle", "Kettlebell", "Squat", "Principiante", "Funzionale"),
    ("Turkish get-up", "Core, Spalle, Glutei", "Tutto il corpo", "Kettlebell", "Multi-planare", "Avanzato", "Funzionale"),
    ("Kettlebell snatch", "Glutei, Spalle, Core", "Femorali, Trapezio", "Kettlebell", "Tiro esplosivo", "Avanzato", "Funzionale"),
    ("Thruster con bilanciere", "Quadricipiti, Spalle", "Core, Tricipiti", "Bilanciere", "Squat + press", "Intermedio", "Funzionale"),
    ("Burpee", "Tutto il corpo", "Core, Spalle, Gambe", "Corpo libero", "Multi-planare", "Intermedio", "Condizionamento"),
    ("Box jump", "Quadricipiti, Glutei", "Polpacci, Core", "Box pliometrico", "Salto pliometrico", "Intermedio", "Pliometria"),
    ("Broad jump", "Quadricipiti, Glutei", "Core, Polpacci", "Corpo libero", "Salto orizzontale", "Intermedio", "Pliometria"),
    ("Battle rope (onde alternate)", "Spalle, Core", "Braccia, Gambe", "Battle rope", "Condizionamento", "Principiante", "Condizionamento"),
    ("Sled push", "Quadricipiti, Glutei", "Core, Polpacci", "Sled", "Spinta orizzontale", "Intermedio", "Funzionale"),
    ("Farmer's walk", "Trapezio, Core", "Avambracci, Gambe", "Manubri o Trap bar", "Portata sotto carico", "Principiante", "Funzionale"),
    ("Tire flip", "Glutei, Schiena bassa, Spalle", "Core, Tricipiti", "Copertone", "Spinta esplosiva", "Avanzato", "Funzionale"),
    ("Wall ball", "Quadricipiti, Spalle", "Core, Glutei", "Wall ball", "Squat + lancio", "Principiante", "Condizionamento"),
    ("Rope climb", "Dorsali, Bicipiti", "Core, Avambracci", "Corda", "Arrampicata", "Intermedio", "Funzionale"),

    # ── CORSA / ATLETICA ─────────────────────────────────────────────────────
    ("Corsa lenta (easy run)", "Quadricipiti, Femorali, Polpacci", "Core, Glutei", "Nessun attrezzo", "Corsa aerobica", "Principiante", "Resistenza"),
    ("Corsa a ritmo soglia", "Quadricipiti, Femorali, Polpacci", "Core, Glutei", "Nessun attrezzo", "Corsa lattacida", "Intermedio", "Resistenza"),
    ("Interval sprint (400m)", "Quadricipiti, Femorali, Glutei", "Polpacci, Core", "Pista", "Sprint intervalato", "Intermedio", "Velocità"),
    ("Sprint (60–100m)", "Femorali, Glutei, Polpacci", "Core, Braccia", "Pista", "Accelerazione massimale", "Avanzato", "Velocità"),
    ("Fartlek", "Quadricipiti, Femorali", "Core, Polpacci", "Nessun attrezzo", "Variazione ritmo", "Intermedio", "Resistenza"),
    ("Salita ripetuta (hill repeat)", "Glutei, Quadricipiti, Polpacci", "Core", "Pendenza naturale", "Corsa in salita", "Intermedio", "Resistenza"),
    ("Salti con la corda", "Polpacci, Coordinazione", "Spalle, Avambracci", "Corda salto", "Salto ritmico", "Principiante", "Condizionamento"),
    ("High knees", "Flessori anca, Quadricipiti", "Core", "Corpo libero", "Corsa in luogo", "Principiante", "Condizionamento"),
    ("A-skip", "Flessori anca, Polpacci", "Core", "Corpo libero", "Corsa tecnica", "Principiante", "Atletismo"),
    ("B-skip", "Femorali, Glutei", "Core", "Corpo libero", "Corsa tecnica", "Intermedio", "Atletismo"),
    ("Anello rapido (ladder drill)", "Coordinazione, Agilità", "Quadricipiti, Polpacci", "Scala agilità", "Velocità piedi", "Principiante", "Agilità"),

    # ── NUOTO ────────────────────────────────────────────────────────────────
    ("Stile libero (Crawl)", "Dorsali, Spalle, Pettorali", "Tricipiti, Core, Gambe", "Vasca", "Nuoto crawl", "Principiante", "Resistenza"),
    ("Dorso", "Dorsali, Spalle posteriori", "Tricipiti, Core", "Vasca", "Nuoto dorso", "Principiante", "Resistenza"),
    ("Rana", "Pettorali interni, Adduttori", "Quadricipiti, Core", "Vasca", "Nuoto rana", "Intermedio", "Resistenza"),
    ("Farfalla (butterfly)", "Pettorali, Dorsali, Core", "Spalle, Tricipiti", "Vasca", "Nuoto butterfly", "Avanzato", "Resistenza"),
    ("Interval nuoto (serie 50m/100m)", "Tutto il corpo", "Core", "Vasca", "Nuoto intervallato", "Intermedio", "Resistenza"),
    ("Pull buoy drill", "Pettorali, Dorsali, Braccia", None, "Vasca, Pull buoy", "Nuoto bracciata", "Principiante", "Tecnica"),
    ("Kickboard drill", "Quadricipiti, Glutei, Polpacci", None, "Vasca, Tavoletta", "Nuoto gambe", "Principiante", "Tecnica"),

    # ── CICLISMO ─────────────────────────────────────────────────────────────
    ("Endurance ride (bassa intensità)", "Quadricipiti, Femorali, Glutei", "Core, Polpacci", "Bicicletta", "Pedalata aerobica", "Principiante", "Resistenza"),
    ("Interval in bici (VO2max)", "Quadricipiti, Glutei", "Core, Femorali", "Bicicletta o rullo", "Pedalata ad alta intensità", "Avanzato", "Resistenza"),
    ("Sprint in bici (30 sec)", "Quadricipiti, Glutei", "Core, Femorali", "Bicicletta", "Pedalata massimale", "Avanzato", "Velocità"),
    ("Salita in bici", "Glutei, Quadricipiti", "Core, Erettori", "Bicicletta, Pendenza", "Pedalata in salita", "Intermedio", "Resistenza"),

    # ── CALCIO / SPORT DI SQUADRA ────────────────────────────────────────────
    ("Scatto + cambio di direzione", "Quadricipiti, Glutei", "Polpacci, Core", "Coni", "Sprint agilità", "Intermedio", "Agilità"),
    ("Tiro in porta", "Quadricipiti, Femorali, Core", "Spalle, Braccia", "Pallone", "Gesto tecnico calcio", "Principiante", "Sport specifico"),
    ("Passaggio lungo (calcio)", "Quadricipiti, Core", None, "Pallone", "Gesto tecnico calcio", "Principiante", "Sport specifico"),
    ("Dribbling a coni", "Agilità, Coordinazione", "Core, Polpacci", "Coni, Pallone", "Tecnica con palla", "Principiante", "Sport specifico"),
    ("Salto in detensione (basket)", "Quadricipiti, Glutei, Polpacci", "Core", "Corpo libero", "Salto verticale", "Intermedio", "Pliometria"),
    ("Tiro da tre punti (basket)", "Spalle, Tricipiti", "Core, Gambe", "Pallone, Canestro", "Gesto tecnico basket", "Intermedio", "Sport specifico"),

    # ── TENNIS / RACCHETTA ───────────────────────────────────────────────────
    ("Dritto a tutto campo", "Spalle, Core", "Gambe, Avambraccio", "Racchetta, Pallina", "Gesto tecnico tennis", "Principiante", "Sport specifico"),
    ("Rovescio bimane", "Spalle, Core, Avambraccio", "Gambe", "Racchetta, Pallina", "Gesto tecnico tennis", "Intermedio", "Sport specifico"),
    ("Servizio al volo", "Spalle, Tricipiti, Core", "Gambe", "Racchetta, Pallina", "Gesto tecnico tennis", "Intermedio", "Sport specifico"),

    # ── ARTI MARZIALI / COMBAT ───────────────────────────────────────────────
    ("Jab-cross al sacco", "Spalle, Pettorali", "Tricipiti, Core", "Sacco da boxe, Guantoni", "Combinazione pugni", "Principiante", "Sport specifico"),
    ("Gancio destro al sacco", "Spalle, Pettorali interni", "Core, Trapezio", "Sacco, Guantoni", "Gesto tecnico boxe", "Intermedio", "Sport specifico"),
    ("Calcio frontale (Mae geri)", "Quadricipiti, Flessori anca", "Core, Glutei", "Corpo libero o sacco", "Calcio frontale", "Principiante", "Sport specifico"),
    ("Calcio rotante (Mawashi geri)", "Femorali, Glutei, Core", "Adduttori", "Corpo libero o sacco", "Calcio circolare", "Intermedio", "Sport specifico"),
    ("Shadow boxing", "Spalle, Core, Coordinazione", "Gambe, Braccia", "Corpo libero", "Combinazioni libere", "Principiante", "Condizionamento"),
    ("Sprawl difensivo", "Core, Spalle", "Gambe, Braccia", "Materassino", "Difesa abbattimento", "Intermedio", "Sport specifico"),
    ("Guard pass (BJJ/lotta)", "Core, Flessori anca, Gambe", "Spalle, Braccia", "Materassino", "Tecnica lotta a terra", "Intermedio", "Sport specifico"),

    # ── YOGA / MOBILITÀ ──────────────────────────────────────────────────────
    ("Saluto al sole (A)", "Tutto il corpo", "Core, Spalle", "Tappetino", "Flusso yoga", "Principiante", "Mobilità"),
    ("Warrior I (Virabhadrasana I)", "Quadricipiti, Glutei", "Core, Spalle", "Tappetino", "Equilibrio e stabilità", "Principiante", "Mobilità"),
    ("Warrior II (Virabhadrasana II)", "Quadricipiti, Adduttori", "Core, Spalle", "Tappetino", "Equilibrio", "Principiante", "Mobilità"),
    ("Pigeon pose (Eka pada kapotasana)", "Rotatori esterni anca, Flessori anca", "Glutei", "Tappetino", "Stretch anca", "Intermedio", "Mobilità"),
    ("Downward dog", "Femorali, Polpacci, Spalle", "Core", "Tappetino", "Stretch posteriore", "Principiante", "Mobilità"),
    ("Hip 90/90 stretch", "Rotatori anca, Piriforme", "Glutei", "Tappetino", "Mobilità anca", "Principiante", "Mobilità"),
    ("Couch stretch", "Flessori anca, Quadricipiti", None, "Muro o corpo libero", "Mobilità anca", "Principiante", "Mobilità"),
    ("World's greatest stretch", "Flessori anca, Dorsali, Spalle", "Core, Femorali", "Tappetino", "Mobilità multi-planare", "Intermedio", "Mobilità"),
    ("Cat-cow", "Erettori spinali, Core", None, "Tappetino", "Mobilità colonna", "Principiante", "Mobilità"),
    ("Thoracic rotation", "Erettori toracici, Obliqui", "Spalle", "Tappetino", "Mobilità toracica", "Principiante", "Mobilità"),
    ("Ankle circles", "Mobilità caviglia", None, "Corpo libero", "Mobilità articolare", "Principiante", "Mobilità"),

    # ── PILATES / STABILITÀ ──────────────────────────────────────────────────
    ("Hundred (Pilates)", "Core, Retto addominale", "Spalle, Gambe", "Tappetino", "Stabilizzazione core", "Principiante", "Pilates"),
    ("Roll-up (Pilates)", "Retto addominale", "Flessori anca, Erettori", "Tappetino", "Flessione tronco", "Intermedio", "Pilates"),
    ("Single leg stretch (Pilates)", "Core", "Flessori anca", "Tappetino", "Coordinazione core", "Principiante", "Pilates"),
    ("Teaser (Pilates)", "Core, Flessori anca", "Spalle", "Tappetino", "Equilibrio + core", "Avanzato", "Pilates"),
    ("Side kick (Pilates)", "Glutei, Adduttori, Abduttori", "Core", "Tappetino", "Stabilizzazione laterale", "Principiante", "Pilates"),

    # ── HIIT / CARDIO ────────────────────────────────────────────────────────
    ("Mountain climbers", "Core, Flessori anca", "Spalle, Quadricipiti", "Corpo libero", "Plank dinamico", "Principiante", "Condizionamento"),
    ("Jumping jacks", "Tutto il corpo (bassa intensità)", "Coordinazione", "Corpo libero", "Salto bipodalico", "Principiante", "Condizionamento"),
    ("Jump squat", "Quadricipiti, Glutei", "Core, Polpacci", "Corpo libero", "Squat pliometrico", "Intermedio", "Pliometria"),
    ("Lateral bound", "Glutei, Abduttori", "Core, Polpacci", "Corpo libero", "Salto laterale", "Intermedio", "Pliometria"),
    ("Skater jump", "Glutei, Quadricipiti", "Core, Polpacci", "Corpo libero", "Salto laterale monopodalico", "Intermedio", "Pliometria"),
    ("Tuck jump", "Quadricipiti, Glutei, Core", "Polpacci", "Corpo libero", "Salto con raccolta gambe", "Intermedio", "Pliometria"),
    ("Sprint in water (acqua jogging)", "Quadricipiti, Core, Glutei", None, "Vasca", "Corsa in acqua", "Principiante", "Resistenza"),

    # ── SPORT INVERNALI ──────────────────────────────────────────────────────
    ("Sci alpino – posizione di gara", "Quadricipiti, Glutei, Core", "Femorali, Polpacci", "Sci e attrezzatura", "Flessione isometrica gambe", "Avanzato", "Sport specifico"),
    ("Sci di fondo – diagonale", "Gambe, Spalle, Core", "Braccia, Dorsali", "Sci da fondo", "Movimento ciclico", "Intermedio", "Resistenza"),

    # ── ARRAMPICATA ──────────────────────────────────────────────────────────
    ("Traversata su parete (traverso)", "Avambracci, Dorsali", "Core, Spalle", "Muro di arrampicata", "Tiro + presa", "Principiante", "Arrampicata"),
    ("Campus board", "Avambracci, Dorsali, Bicipiti", "Core, Spalle", "Campus board", "Tiro dinamico", "Avanzato", "Arrampicata"),
    ("Hang su dita (dead hang)", "Avambracci, Presa", "Dorsali, Bicipiti", "Sbarra o finger board", "Isometria presa", "Intermedio", "Arrampicata"),
    ("Toe hook su pannello", "Core, Flessori anca", "Avambracci, Dorsali", "Pannello inclinato", "Tecnica piedi", "Intermedio", "Arrampicata"),

    # ── CANOTTAGGIO / ROWING ────────────────────────────────────────────────
    ("Vogata su remoergometro (steady state)", "Dorsali, Glutei, Quadricipiti", "Core, Braccia", "Remoergometro", "Tiro ciclico", "Principiante", "Resistenza"),
    ("Interval remoergometro (500m)", "Dorsali, Glutei, Quadricipiti", "Core", "Remoergometro", "Tiro ad alta intensità", "Intermedio", "Resistenza"),
]


def make_slug(name):
    return slugify(name)[:200]


class Command(BaseCommand):
    help = 'Popola il catalogo esercizi con discipline multiple'

    def handle(self, *args, **kwargs):
        created = 0
        updated = 0
        for row in EXERCISES:
            name, target, secondary, equipment, movement, difficulty, ex_type = row
            slug = make_slug(name)
            obj, made = Exercise.objects.get_or_create(
                slug=slug,
                defaults=dict(
                    name=name,
                    target_muscles=target or '',
                    secondary_muscles=secondary or '',
                    equipment=equipment or '',
                    movement_pattern=movement or '',
                    difficulty_level=difficulty or '',
                    exercise_type=ex_type or '',
                )
            )
            if made:
                created += 1
            else:
                # update fields if exercise already exists with old seed data
                changed = False
                for field, val in [
                    ('target_muscles', target or ''),
                    ('secondary_muscles', secondary or ''),
                    ('equipment', equipment or ''),
                    ('movement_pattern', movement or ''),
                    ('difficulty_level', difficulty or ''),
                    ('exercise_type', ex_type or ''),
                ]:
                    if getattr(obj, field) != val:
                        setattr(obj, field, val)
                        changed = True
                if changed:
                    obj.save()
                    updated += 1

        self.stdout.write(self.style.SUCCESS(
            f'Esercizi creati: {created} | aggiornati: {updated} | totale catalogo: {len(EXERCISES)}'
        ))
