from django.core.management.base import BaseCommand
from domain.nutrition.models import Supplement


SUPPLEMENTS = [
    # name, category, description, unit
    # Proteine
    ("Whey protein (concentrato)", "Proteine", "Proteina del siero del latte, rapida assorbibilità", "g"),
    ("Whey protein (isolato)", "Proteine", "Whey isolato, minimo lattosio e grassi", "g"),
    ("Caseina", "Proteine", "Proteina a lento rilascio, ideale pre-nanna", "g"),
    ("Proteine vegetali (soia)", "Proteine", "Proteine di soia in polvere, profilo aminoacidico completo", "g"),
    ("Proteine vegetali (pisello)", "Proteine", "Proteine di pisello, alta digeribilità", "g"),

    # Aminoacidi
    ("BCAA 2:1:1", "Aminoacidi", "Leucina, Isoleucina, Valina in rapporto 2:1:1", "g"),
    ("BCAA 4:1:1", "Aminoacidi", "BCAA ad alto contenuto di leucina", "g"),
    ("Glutammina", "Aminoacidi", "Aminoacido condizionatamente essenziale, supporto recupero", "g"),
    ("Creatina monoidrato", "Aminoacidi", "Forma più studiata di creatina, supporto forza e ipertrofia", "g"),
    ("Creatina HCl", "Aminoacidi", "Creatina cloridrato, alta solubilità", "g"),
    ("Beta-alanina", "Aminoacidi", "Precursore della carnosina, ritarda affaticamento muscolare", "g"),
    ("Citrullina malato", "Aminoacidi", "Migliora pompa muscolare e resistenza", "g"),
    ("L-Arginina", "Aminoacidi", "Precursore dell'ossido nitrico", "g"),
    ("Taurina", "Aminoacidi", "Supporto recupero e idratazione cellulare", "mg"),
    ("EAA (aminoacidi essenziali)", "Aminoacidi", "Profilo completo degli 8 aminoacidi essenziali", "g"),

    # Vitamine
    ("Vitamina D3", "Vitamine", "Colecalciferolo, supporto ossa, immunità e ormoni", "UI"),
    ("Vitamina C", "Vitamine", "Acido ascorbico, antiossidante e supporto immunitario", "mg"),
    ("Vitamina B12", "Vitamine", "Cianocobalamina o metilcobalamina, energetica e neurologica", "mcg"),
    ("Vitamina K2 (MK-7)", "Vitamine", "Sinergica con D3 per metabolismo calcio", "mcg"),
    ("Vitamina E", "Vitamine", "Tocoferolo, antiossidante liposolubile", "mg"),
    ("Vitamina B6", "Vitamine", "Piridossina, metabolismo proteico e nervoso", "mg"),
    ("Folato (B9)", "Vitamine", "Acido folico o metilfolato, divisione cellulare", "mcg"),
    ("Complesso B", "Vitamine", "Tutte le vitamine del gruppo B in formula combinata", "caps"),

    # Minerali
    ("Magnesio bisglicinato", "Minerali", "Forma ad alta biodisponibilità, sonno e muscoli", "mg"),
    ("Magnesio citrato", "Minerali", "Alta biodisponibilità, rilassamento muscolare", "mg"),
    ("Zinco", "Minerali", "Supporto testosterone, immunità e recupero", "mg"),
    ("Ferro", "Minerali", "Trasporto ossigeno, energia e prevenzione anemia", "mg"),
    ("Calcio", "Minerali", "Salute ossea e funzione muscolare", "mg"),
    ("Selenio", "Minerali", "Antiossidante, funzione tiroidea", "mcg"),
    ("Iodio", "Minerali", "Supporto funzione tiroidea", "mcg"),
    ("ZMA", "Minerali", "Zinco + Magnesio + B6, recupero notturno", "caps"),
    ("Potassio", "Minerali", "Equilibrio elettrolitico e funzione muscolare", "mg"),

    # Omega & Grassi
    ("Omega-3 (EPA+DHA)", "Omega & Grassi", "Acidi grassi essenziali, antiinfiammatori", "g"),
    ("Olio di pesce", "Omega & Grassi", "Fonte naturale di EPA e DHA", "g"),
    ("Olio di krill", "Omega & Grassi", "Omega-3 con fosfatidilcolina, alta biodisponibilità", "g"),
    ("Olio di lino", "Omega & Grassi", "ALA, precursore vegetale degli omega-3", "ml"),
    ("MCT oil", "Omega & Grassi", "Trigliceridi a catena media, energia rapida", "ml"),

    # Antiossidanti & Fitoterapici
    ("Curcumina (Curcuma)", "Fitoterapici", "Potente antiinfiammatorio naturale, con piperina per biodisponibilità", "mg"),
    ("Ashwagandha", "Fitoterapici", "Adattogeno, riduzione cortisolo e stress", "mg"),
    ("Rhodiola Rosea", "Fitoterapici", "Adattogeno, resistenza allo stress fisico e mentale", "mg"),
    ("Ginseng", "Fitoterapici", "Adattogeno, energia e performance cognitiva", "mg"),
    ("Coenzima Q10", "Antiossidanti", "Energia mitocondriale e antiossidante", "mg"),
    ("Resveratrolo", "Antiossidanti", "Antiossidante polifenolico, longevità cellulare", "mg"),
    ("Acido lipoico (ALA)", "Antiossidanti", "Antiossidante universale, sensibilità insulinica", "mg"),
    ("NAC (N-acetil-cisteina)", "Antiossidanti", "Precursore del glutatione, detox epatico", "mg"),

    # Performance & Energia
    ("Caffeina anidra", "Performance", "Stimolante del SNC, focus e performance", "mg"),
    ("L-Teanina", "Performance", "Sinergica con caffeina, riduce ansia da stimolanti", "mg"),
    ("Beta-ecdysterone", "Performance", "Ecdisteroide naturale, supporto anabolico naturale", "mg"),
    ("Inosina", "Performance", "Supporto metabolismo energetico atletico", "mg"),
    ("Bicarbonato di sodio", "Performance", "Buffer lattato, resistenza ad alta intensità", "g"),

    # Digestione & Gut
    ("Probiotici (multi-ceppo)", "Digestione", "Supporto microbioma intestinale", "miliardi CFU"),
    ("Prebiotici (inulina/FOS)", "Digestione", "Nutrimento per flora batterica benefica", "g"),
    ("Enzimi digestivi", "Digestione", "Migliorano digestione di proteine, grassi, carboidrati", "caps"),
    ("Zenzero", "Digestione", "Antiinfiammatorio gastrointestinale", "mg"),

    # Sonno & Recupero
    ("Melatonina", "Sonno & Recupero", "Regolazione ciclo sonno-veglia", "mg"),
    ("5-HTP", "Sonno & Recupero", "Precursore serotonina/melatonina, sonno e umore", "mg"),
    ("GABA", "Sonno & Recupero", "Neurotrasmettitore inibitorio, rilassamento", "mg"),
    ("Glicina", "Sonno & Recupero", "Aminoacido, qualità del sonno e collagene", "g"),

    # Collagene & Articolazioni
    ("Collagene idrolizzato", "Articolazioni", "Supporto cartilagine, tendini e pelle", "g"),
    ("Glucosamina", "Articolazioni", "Supporto struttura cartilaginea", "mg"),
    ("Condroitina", "Articolazioni", "Mantenimento cartilagine articolare", "mg"),
    ("MSM (metilsulfonilmetano)", "Articolazioni", "Zolfo organico, antiinfiammatorio articolare", "mg"),
    ("Boswellia", "Articolazioni", "Estratto antiinfiammatorio per articolazioni", "mg"),
]


class Command(BaseCommand):
    help = 'Popola il catalogo integratori'

    def handle(self, *args, **kwargs):
        created = 0
        for name, category, description, unit in SUPPLEMENTS:
            _, made = Supplement.objects.get_or_create(
                name=name,
                defaults=dict(category=category, description=description, unit=unit)
            )
            if made:
                created += 1
        self.stdout.write(self.style.SUCCESS(f'Integratori creati: {created} / {len(SUPPLEMENTS)}'))
