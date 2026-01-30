// script.js – I Ching Metaverso v3.2 - Layout Otimizado

class IChingMetaverse {
  constructor() {
    this.hexagrams = this.createHexagrams();
    this.currentHexagram = null;
    this.mutantHexagram = null;
    this.changingLines = [];
    this.isTransitioning = false;
    this.currentMethod = 'coins';
    this.consultationHistory = [];
    this.userPattern = [];
    
    // Limites de armazenamento
    this.MAX_HISTORY = 100;
    this.MAX_PATTERN = 20;
    
    this.init();
  }

  init() {
    this.cacheElements();
    this.loadUserData();
    this.bindEvents();
    this.setupLibrary();
    this.updateCharCount();
    this.updatePatternDisplay();
    
    // Inicializar com método padrão
    this.selectMethod('coins');
  }

  cacheElements() {
    // Estados
    this.stateIntention = document.getElementById('state-intention');
    this.stateFormation = document.getElementById('state-formation');
    this.stateRevelation = document.getElementById('state-revelation');
    
    // Intenção
    this.intentionInput = document.getElementById('intentionInput');
    this.charCount = document.getElementById('charCount');
    this.consultBtn = document.getElementById('consultBtn');
    
    // Métodos
    this.methodItems = document.querySelectorAll('.method-item');
    
    // Formação
    this.formationStatus = document.getElementById('formationStatus');
    this.formationSymbol = document.getElementById('formationSymbol');
    this.progressFill = document.getElementById('progressFill');
    this.progressText = document.getElementById('progressText');
    this.progressPercent = document.getElementById('progressPercent');
    this.estimatedTime = document.getElementById('estimatedTime');
    this.currentMethodDisplay = document.getElementById('currentMethod');
    
    // Revelação
    this.revealedNumber = document.getElementById('revealedNumber');
    this.revealedName = document.getElementById('revealedName');
    this.revealedSymbol = document.getElementById('revealedSymbol');
    this.revealedImage = document.getElementById('revealedImage');
    this.revealedInterpretation = document.getElementById('revealedInterpretation');
    this.intentionEcho = document.getElementById('intentionEcho');
    
    // Transformação
    this.transformationSection = document.getElementById('transformationSection');
    this.originalSymbol = document.getElementById('originalSymbol');
    this.resultSymbol = document.getElementById('resultSymbol');
    this.transformationText = document.getElementById('transformationText');
    
    // Mutantes
    this.mutantsSection = document.getElementById('mutantsSection');
    this.mutantsList = document.getElementById('mutantsList');
    
    // Ações
    this.newConsultationBtn = document.getElementById('newConsultationBtn');
    this.shareBtn = document.getElementById('shareBtn');
    this.saveBtn = document.getElementById('saveBtn');
    this.printBtn = document.getElementById('printBtn');
    
    // Metadados
    this.consultationDate = document.getElementById('consultationDate');
    this.usedMethod = document.getElementById('usedMethod');
    
    // Padrão
    this.patternToggle = document.getElementById('patternToggle');
    this.patternContent = document.getElementById('patternContent');
    this.totalConsults = document.getElementById('totalConsults');
    this.dominantPattern = document.getElementById('dominantPattern');
    this.patternChips = document.getElementById('patternChips');
    
    // Painel Lateral
    this.sidePanel = document.getElementById('sidePanel');
    this.panelClose = document.getElementById('panelClose');
    this.panelOverlay = document.getElementById('panelOverlay');
    
    // Console buttons
    this.consoleLibrary = document.getElementById('consoleLibrary');
    this.consoleHelp = document.getElementById('consoleHelp');
    this.consoleMethods = document.getElementById('consoleMethods');
    this.consoleSettings = document.getElementById('consoleSettings');
    
    // Abas
    this.panelTabs = document.querySelectorAll('.panel-tab');
    this.tabContents = document.querySelectorAll('.tab-content');
    
    // Biblioteca
    this.historyList = document.getElementById('historyList');
    this.exportHistory = document.getElementById('exportHistory');
    this.clearHistory = document.getElementById('clearHistory');
    
    // Hexagramas
    this.hexagramsGrid = document.getElementById('hexagramsGrid');
    this.hexagramSearch = document.getElementById('hexagramSearch');
    
    // Modais
    this.exportModal = document.getElementById('exportModal');
    this.importModal = document.getElementById('importModal');
    this.exportPreview = document.getElementById('exportPreview');
    this.exportOptions = document.querySelectorAll('.export-option');
    this.copyExport = document.getElementById('copyExport');
    this.downloadExport = document.getElementById('downloadExport');
    this.importData = document.getElementById('importData');
    this.confirmImport = document.getElementById('confirmImport');
    this.cancelImport = document.getElementById('cancelImport');
    
    // Toast
    this.toastContainer = document.getElementById('toastContainer');
    this.toastIcon = document.querySelector('.toast-icon');
    this.toastMessage = document.querySelector('.toast-message');
    
    // Live announcements for accessibility
    this.liveAnnouncements = document.getElementById('liveAnnouncements');
  }

  createHexagrams() {
    return [
      {
        number: 1,
        name: "O Criativo",
        image: "Céu em movimento incessante, força que não cessa.",
        lines: [1, 1, 1, 1, 1, 1],
        interpretation: "Força criativa em ação. Tempo de liderança e iniciativa."
      },
      {
        number: 2,
        name: "O Receptivo",
        image: "Terra que acolhe tudo, sem perguntar.",
        lines: [0, 0, 0, 0, 0, 0],
        interpretation: "Flexibilidade, abertura e receptividade. Aguarde o momento certo."
      },
      {
        number: 3,
        name: "Dificuldade Inicial",
        image: "Neblina sobre o terreno, germes de algo ainda informe.",
        lines: [1, 0, 0, 0, 1, 0],
        interpretation: "Desafios iniciais. Avance com paciência e organização."
      },
      {
        number: 4,
        name: "A Insensatez Juvenil",
        image: "Montanha encoberta por neblina, mente ainda por amadurecer.",
        lines: [0, 1, 0, 0, 0, 1],
        interpretation: "Aprendizagem necessária. Evite impulsos e procure orientação."
      },
      {
        number: 5,
        name: "Aguardando",
        image: "Nuvens acumulam-se no céu, chuva por vir.",
        lines: [1, 0, 1, 1, 1, 0],
        interpretation: "Momento de espera ativa. Confie no processo."
      },
      {
        number: 6,
        name: "Conflito",
        image: "Água contra o céu, forças em oposição.",
        lines: [0, 1, 1, 1, 0, 1],
        interpretation: "Evite confrontos diretos. Busque mediação e clareza."
      },
      {
        number: 7,
        name: "O Exército",
        image: "Terra sob água, disciplina e estratégia.",
        lines: [0, 0, 1, 0, 0, 0],
        interpretation: "Organização e liderança firme. Avance com ordem."
      },
      {
        number: 8,
        name: "Solidariedade",
        image: "Água sobre terra, união que se forma.",
        lines: [0, 0, 0, 1, 0, 0],
        interpretation: "Alianças e cooperação. Reúna pessoas certas."
      },
      {
        number: 9,
        name: "A Força Domesticadora do Pequeno",
        image: "Vento sopra no céu, suavemente controlando.",
        lines: [1, 1, 1, 0, 1, 0],
        interpretation: "Progresso lento. Controle suave e constância."
      },
      {
        number: 10,
        name: "Conduta",
        image: "Caminho estreito entre forças maiores.",
        lines: [0, 1, 0, 1, 1, 1],
        interpretation: "Avance com cuidado e respeito. Ética é essencial."
      },
      {
        number: 11,
        name: "Paz",
        image: "Céu e terra em harmonia, fluxo livre.",
        lines: [1, 1, 1, 0, 0, 0],
        interpretation: "Prosperidade e equilíbrio. Tempo favorável."
      },
      {
        number: 12,
        name: "Estagnação",
        image: "Céu acima, terra abaixo, sem encontro.",
        lines: [0, 0, 0, 1, 1, 1],
        interpretation: "Bloqueios e afastamento. Aguarde mudanças."
      },
      {
        number: 13,
        name: "Comunidade com as Pessoas",
        image: "Fogo no céu, união através da clareza.",
        lines: [1, 1, 1, 1, 0, 1],
        interpretation: "Ação coletiva. Transparência fortalece vínculos."
      },
      {
        number: 14,
        name: "Grande Possessão",
        image: "Fogo sobre o céu, abundância luminosa.",
        lines: [1, 0, 1, 1, 1, 1],
        interpretation: "Riqueza interior e exterior. Use com sabedoria."
      },
      {
        number: 15,
        name: "Modéstia",
        image: "Montanha dentro da terra, força contida.",
        lines: [0, 0, 0, 0, 1, 0],
        interpretation: "Humildade verdadeira. Poder silencioso."
      },
      {
        number: 16,
        name: "Entusiasmo",
        image: "Trovão sobre a terra, energia que desperta.",
        lines: [0, 1, 0, 0, 0, 0],
        interpretation: "Movimento inspirado. Canalize a energia."
      },
      {
        number: 17,
        name: "Seguimento",
        image: "Trovão sob o lago, movimento natural.",
        lines: [1, 1, 0, 0, 1, 1],
        interpretation: "Adaptação fluida. Siga o que é verdadeiro."
      },
      {
        number: 18,
        name: "Trabalho no que se Deteriorou",
        image: "Vento sopra sobre a montanha, limpeza necessária.",
        lines: [1, 0, 0, 0, 0, 1],
        interpretation: "Corrigir erros antigos. Restauração."
      },
      {
        number: 19,
        name: "Aproximação",
        image: "Terra sobre o lago, aproximação gradual.",
        lines: [1, 1, 0, 0, 0, 0],
        interpretation: "Crescimento e proximidade. Boa fortuna."
      },
      {
        number: 20,
        name: "Contemplação",
        image: "Vento sobre a terra, visão ampla.",
        lines: [0, 0, 0, 0, 1, 1],
        interpretation: "Observe antes de agir. Clareza surge da distância."
      },
      {
        number: 21,
        name: "Morder e Penetrar",
        image: "Fogo e trovão, ação decisiva.",
        lines: [1, 0, 1, 0, 1, 1],
        interpretation: "Resolva obstáculos com firmeza."
      },
      {
        number: 22,
        name: "Graça",
        image: "Fogo sobre a montanha, beleza contida.",
        lines: [1, 0, 0, 0, 1, 1],
        interpretation: "Elegância e forma. Simplicidade revela essência."
      },
      {
        number: 23,
        name: "Desintegração",
        image: "Montanha se desfaz sobre a terra.",
        lines: [0, 0, 0, 0, 0, 1],
        interpretation: "Algo se desfaz. Aceite o ciclo."
      },
      {
        number: 24,
        name: "Retorno",
        image: "Trovão sob a terra, retorno do movimento.",
        lines: [1, 0, 0, 0, 0, 0],
        interpretation: "Recomeço natural. Volte ao essencial."
      },
      {
        number: 25,
        name: "Inocência",
        image: "Trovão sob o céu, espontaneidade pura.",
        lines: [1, 1, 1, 0, 0, 1],
        interpretation: "Aja com autenticidade. Evite artifícios."
      },
      {
        number: 26,
        name: "A Força Domesticadora do Grande",
        image: "Montanha sob o céu, poder contido.",
        lines: [1, 1, 1, 0, 0, 0],
        interpretation: "Disciplina profunda. Acumule força."
      },
      {
        number: 27,
        name: "Nutrição",
        image: "Montanha sob o trovão, boca que se abre.",
        lines: [0, 0, 1, 0, 0, 1],
        interpretation: "Cuide do que alimenta corpo e espírito."
      },
      {
        number: 28,
        name: "Preponderância do Grande",
        image: "Lago sobre o vento, peso excessivo.",
        lines: [0, 1, 1, 1, 1, 0],
        interpretation: "Sobrecarga. Reforce a estrutura."
      },
      {
        number: 29,
        name: "O Abismal",
        image: "Água em profundidade, passagens estreitas entre rochas.",
        lines: [0, 1, 0, 0, 1, 0],
        interpretation: "Perigo à frente. Mantenha a calma e siga com cautela."
      },
      {
        number: 30,
        name: "Aderir",
        image: "Fogo duplicado, luz que se fixa.",
        lines: [1, 0, 1, 1, 0, 1],
        interpretation: "Clareza e lucidez. Mantenha foco."
      },
      {
        number: 31,
        name: "Influência",
        image: "Lago sobre montanha, atração suave.",
        lines: [0, 0, 1, 1, 1, 0],
        interpretation: "Atração mútua. A influência nasce da suavidade."
      },
      {
        number: 32,
        name: "Duração",
        image: "Trovão e vento, continuidade.",
        lines: [1, 0, 1, 0, 0, 1],
        interpretation: "Persistência e estabilidade. Continue firme."
      },
      {
        number: 33,
        name: "Retirada",
        image: "Céu sobre montanha, afastamento estratégico.",
        lines: [1, 1, 1, 0, 0, 1],
        interpretation: "Retire-se para preservar força."
      },
      {
        number: 34,
        name: "O Poder do Grande",
        image: "Trovão sobre o céu, força expansiva.",
        lines: [1, 1, 1, 1, 0, 0],
        interpretation: "Poder disponível. Use com ética."
      },
      {
        number: 35,
        name: "Progresso",
        image: "Fogo sobre a terra, avanço visível.",
        lines: [0, 0, 0, 1, 0, 1],
        interpretation: "Avanço rápido. Aproveite a luz."
      },
      {
        number: 36,
        name: "Ofuscação da Luz",
        image: "Fogo sob a terra, luz escondida.",
        lines: [1, 0, 1, 0, 0, 0],
        interpretation: "Proteja sua luz. Momento de discrição."
      },
      {
        number: 37,
        name: "A Família",
        image: "Vento sobre fogo, ordem interna.",
        lines: [1, 0, 1, 1, 1, 0],
        interpretation: "Harmonia doméstica. Estrutura e cuidado."
      },
      {
        number: 38,
        name: "Oposição",
        image: "Fogo sobre o lago, diferenças claras.",
        lines: [0, 1, 1, 1, 0, 1],
        interpretation: "Divergências. Busque pontos de encontro."
      },
      {
        number: 39,
        name: "Obstrução",
        image: "Água sobre montanha, bloqueio.",
        lines: [0, 0, 1, 0, 1, 0],
        interpretation: "Dificuldades. Reavalie o caminho."
      },
      {
        number: 40,
        name: "Libertação",
        image: "Trovão sobre água, tensão que se desfaz.",
        lines: [0, 1, 0, 1, 0, 0],
        interpretation: "Alívio e solução. Avance leve."
      },
      {
        number: 41,
        name: "Diminuição",
        image: "Montanha sobre o lago, redução necessária.",
        lines: [0, 1, 1, 0, 0, 1],
        interpretation: "Simplifique. Corte excessos."
      },
      {
        number: 42,
        name: "Aumento",
        image: "Vento sobre trovão, expansão.",
        lines: [1, 0, 0, 1, 1, 0],
        interpretation: "Crescimento. Aja com generosidade."
      },
      {
        number: 43,
        name: "Despontar",
        image: "Lago sobre o céu, decisão firme.",
        lines: [1, 1, 1, 1, 1, 0],
        interpretation: "Aja com clareza. Corte o negativo."
      },
      {
        number: 44,
        name: "Encontro",
        image: "Vento sob o céu, encontro súbito.",
        lines: [1, 1, 1, 0, 0, 1],
        interpretation: "Força inesperada. Mantenha limites."
      },
      {
        number: 45,
        name: "Reunião",
        image: "Lago sobre a terra, encontro coletivo.",
        lines: [0, 0, 0, 1, 1, 1],
        interpretation: "União e propósito comum."
      },
      {
        number: 46,
        name: "Ascensão",
        image: "Terra sobre vento, subida constante.",
        lines: [1, 1, 0, 0, 0, 0],
        interpretation: "Progresso gradual. Perseverança."
      },
      {
        number: 47,
        name: "Opressão",
        image: "Lago sobre água, exaustão.",
        lines: [0, 1, 0, 1, 1, 0],
        interpretation: "Pressão externa. Mantenha o centro."
      },
      {
        number: 48,
        name: "O Poço",
        image: "Água sobre madeira, fonte essencial.",
        lines: [0, 1, 0, 0, 0, 1],
        interpretation: "Retorne à fonte. Nutrição profunda."
      },
      {
        number: 49,
        name: "Revolução",
        image: "Fogo sobre o lago, mudança radical.",
        lines: [0, 1, 1, 1, 0, 1],
        interpretation: "Transformação inevitável. Renove-se."
      },
      {
        number: 50,
        name: "O Caldeirão",
        image: "Fogo sobre madeira, alquimia.",
        lines: [1, 0, 0, 0, 1, 1],
        interpretation: "Refinamento. Transmutação interior."
      },
      {
        number: 51,
        name: "O Despertar (Trovão)",
        image: "Trovão que rasga o céu, acordando quem dormia.",
        lines: [1, 0, 0, 1, 0, 0],
        interpretation: "Eventos súbitos. Mantenha serenidade."
      },
      {
        number: 52,
        name: "A Imobilização",
        image: "Montanha dupla, quietude absoluta.",
        lines: [0, 0, 1, 0, 0, 1],
        interpretation: "Pausa necessária. Estabilidade interior."
      },
      {
        number: 53,
        name: "Desenvolvimento Gradual",
        image: "Vento sobre montanha, progresso lento.",
        lines: [0, 0, 1, 1, 0, 1],
        interpretation: "Crescimento constante. Confie no ritmo."
      },
      {
        number: 54,
        name: "A Jovem que se Casa",
        image: "Trovão sobre lago, posição secundária.",
        lines: [1, 1, 0, 0, 1, 0],
        interpretation: "Situação delicada. Aceite limites."
      },
      {
        number: 55,
        name: "Abundância",
        image: "Trovão sobre fogo, brilho intenso.",
        lines: [1, 0, 1, 1, 0, 0],
        interpretation: "Pico de energia. Aproveite o auge."
      },
      {
        number: 56,
        name: "O Viajante",
        image: "Fogo sobre montanha, passagem breve.",
        lines: [1, 0, 1, 1, 1, 0],
        interpretation: "Transitoriedade. Mantenha leveza e discrição."
      },
      {
        number: 57,
        name: "A Suavidade (Vento)",
        image: "Vento que penetra lentamente, moldando o invisível.",
        lines: [0, 1, 1, 0, 1, 1],
        interpretation: "Influência gradual. Suavidade transforma mais do que força."
      },
      {
        number: 58,
        name: "A Alegria (Lago)",
        image: "Dois lagos comunicam-se, alegria compartilhada.",
        lines: [1, 1, 0, 1, 1, 0],
        interpretation: "Expressão sincera. A alegria une e abre caminhos."
      },
      {
        number: 59,
        name: "Dispersão",
        image: "Vento sobre água, dissolvendo bloqueios.",
        lines: [0, 1, 0, 1, 1, 1],
        interpretation: "Dissolva tensões. A união renasce quando o medo se desfaz."
      },
      {
        number: 60,
        name: "Limitação",
        image: "Água sobre lago, fronteiras necessárias.",
        lines: [1, 1, 1, 0, 1, 0],
        interpretation: "Defina limites claros. A forma protege a essência."
      },
      {
        number: 61,
        name: "Verdade Interior",
        image: "Vento sobre lago, sinceridade que atravessa.",
        lines: [0, 1, 1, 1, 1, 0],
        interpretation: "Autenticidade profunda. A confiança nasce do centro."
      },
      {
        number: 62,
        name: "A Preponderância do Pequeno",
        image: "Trovão sobre montanha, cuidado nos detalhes.",
        lines: [0, 0, 1, 1, 1, 0],
        interpretation: "Atenção ao pequeno. Grandes movimentos agora seriam imprudentes."
      },
      {
        number: 63,
        name: "Depois da Conclusão",
        image: "Água sobre fogo, ordem recém-estabelecida.",
        lines: [1, 0, 1, 0, 1, 0],
        interpretation: "Tudo no lugar — mas instável. Mantenha vigilância."
      },
      {
        number: 64,
        name: "Antes da Conclusão",
        image: "Fogo ainda por se fixar, travessia quase no fim.",
        lines: [0, 1, 0, 1, 0, 1],
        interpretation: "Transição iminente. Prepare-se cuidadosamente para o próximo passo."
      }
    ];
  }

  bindEvents() {
    // Intenção
    this.intentionInput.addEventListener('input', () => {
      this.updateCharCount();
      this.validateIntention();
    });

    // Métodos
    this.methodItems.forEach(item => {
      item.addEventListener('click', () => {
        this.selectMethod(item.dataset.method);
      });
      
      // Acessibilidade: teclado
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.selectMethod(item.dataset.method);
        }
      });
    });

    // Consulta
    this.consultBtn.addEventListener('click', () => {
      this.startConsultation();
    });

    // Nova consulta
    this.newConsultationBtn.addEventListener('click', () => {
      this.resetToIntention();
    });

    // Compartilhar
    this.shareBtn.addEventListener('click', () => {
      this.shareConsultation();
    });

    // Guardar
    this.saveBtn.addEventListener('click', () => {
      this.saveToHistory();
      this.showToast('Consulta guardada no histórico', 'success');
    });

    // Imprimir
    this.printBtn.addEventListener('click', () => {
      window.print();
    });

    // Padrão
    this.patternToggle.addEventListener('click', () => {
      this.patternContent.classList.toggle('hidden');
      const icon = this.patternToggle.querySelector('i');
      icon.classList.toggle('fa-chevron-up');
      icon.classList.toggle('fa-chevron-down');
    });

    // Painel Lateral
    this.consoleLibrary.addEventListener('click', () => {
      this.openPanel('library');
    });

    this.consoleHelp.addEventListener('click', () => {
      this.openPanel('help');
    });

    this.consoleMethods.addEventListener('click', () => {
      // Mostrar seletor de métodos
      const methodSection = document.querySelector('.method-selector');
      methodSection.scrollIntoView({ behavior: 'smooth' });
      this.showToast('Escolha um método de consulta', 'info');
    });

    this.consoleSettings.addEventListener('click', () => {
      // Futuro: abrir configurações
      this.showToast('Configurações em desenvolvimento', 'info');
    });

    this.panelClose.addEventListener('click', () => {
      this.closePanel();
    });

    this.panelOverlay.addEventListener('click', () => {
      this.closePanel();
    });

    // Abas
    this.panelTabs.forEach(tab => {
      tab.addEventListener('click', () => {
        this.switchTab(tab.dataset.tab);
      });
    });

    // Histórico
    this.exportHistory.addEventListener('click', () => {
      this.openExportModal();
    });

    this.clearHistory.addEventListener('click', () => {
      if (confirm('Limpar todo o histórico?')) {
        this.clearHistoryData();
      }
    });

    // Hexagramas - busca
    if (this.hexagramSearch) {
      this.hexagramSearch.addEventListener('input', (e) => {
        this.filterHexagrams(e.target.value);
      });
    }

    // Modais
    this.copyExport.addEventListener('click', () => {
      this.copyExportData();
    });

    this.downloadExport.addEventListener('click', () => {
      this.downloadExportData();
    });

    this.confirmImport.addEventListener('click', () => {
      this.importData();
    });

    this.cancelImport.addEventListener('click', () => {
      this.closeModal(this.importModal);
    });

    // Fechar modais ao clicar fora
    [this.exportModal, this.importModal].forEach(modal => {
      modal.addEventListener('click', (e) => {
        if (e.target === modal) {
          this.closeModal(modal);
        }
      });
      
      // Botão de fechar
      const closeBtn = modal.querySelector('.modal-close');
      if (closeBtn) {
        closeBtn.addEventListener('click', () => {
          this.closeModal(modal);
        });
      }
    });

    // Opções de exportação
    this.exportOptions.forEach(option => {
      option.addEventListener('click', () => {
        this.selectExportType(option.dataset.type);
      });
    });

    // Teclado shortcuts
    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape') {
        this.closeAllModals();
        this.closePanel();
      }
      
      // Atalhos numéricos para métodos (1, 2, 3)
      if (e.key >= '1' && e.key <= '3' && this.stateIntention.classList.contains('active')) {
        const methods = ['coins', 'stalks', 'simple'];
        this.selectMethod(methods[parseInt(e.key) - 1]);
      }
    });
  }

  updateCharCount() {
    const count = this.intentionInput.value.length;
    this.charCount.textContent = count;
    this.charCount.style.color = count > 250 ? 'var(--warning)' : 
                                count > 200 ? 'var(--accent)' : 
                                'var(--text-muted)';
  }

  validateIntention() {
    const hasIntention = this.intentionInput.value.trim().length > 0;
    this.consultBtn.disabled = !hasIntention;
    return hasIntention;
  }

  selectMethod(method) {
    this.methodItems.forEach(item => {
      item.classList.remove('active');
      item.setAttribute('aria-pressed', 'false');
    });
    
    const selected = document.querySelector(`[data-method="${method}"]`);
    if (selected) {
      selected.classList.add('active');
      selected.setAttribute('aria-pressed', 'true');
    }
    
    this.currentMethod = method;
    
    // Atualizar display
    const methodNames = {
      coins: '3 Moedas',
      stalks: '50 Varetas',
      simple: 'Direto'
    };
    this.currentMethodDisplay.textContent = methodNames[method];
    
    // Atualizar tempo estimado
    const times = {
      coins: '4 segundos',
      stalks: '6 segundos',
      simple: '1 segundo'
    };
    this.estimatedTime.textContent = times[method];
    
    // Feedback acessível
    this.announce(`Método selecionado: ${methodNames[method]}`);
  }

  async startConsultation() {
    if (this.isTransitioning || !this.validateIntention()) return;
    
    this.isTransitioning = true;
    const intention = this.intentionInput.value.trim();
    
    // Mudar para estado de formação
    this.switchState('formation');
    this.announce('Formando hexagrama...');
    
    // Gerar hexagrama
    const lines = this.generateLines();
    this.changingLines = this.getChangingLines(lines);
    
    // Encontrar hexagrama
    this.currentHexagram = this.findHexagram(lines);
    
    // Calcular mutante se houver linhas mutantes
    if (this.changingLines.length > 0) {
      const mutantLines = this.calculateMutantLines(lines, this.changingLines);
      this.mutantHexagram = this.findHexagram(mutantLines);
    } else {
      this.mutantHexagram = null;
    }
    
    // Animar formação
    await this.animateFormation(lines);
    
    // Revelar resultado
    await this.revealConsultation(intention);
    
    // Salvar automaticamente
    this.saveConsultation(intention);
    
    this.isTransitioning = false;
    this.announce(`Hexagrama ${this.currentHexagram.number} revelado: ${this.currentHexagram.name}`);
  }

  generateLines() {
    const lines = [];
    
    for (let i = 0; i < 6; i++) {
      let value, type;
      
      switch (this.currentMethod) {
        case 'coins':
          const coins = [
            Math.random() < 0.5 ? 3 : 2,
            Math.random() < 0.5 ? 3 : 2,
            Math.random() < 0.5 ? 3 : 2
          ];
          const sum = coins.reduce((a, b) => a + b, 0);
          value = sum;
          type = sum === 6 || sum === 8 ? 0 : 1;
          break;
          
        case 'stalks':
          const rand = Math.random();
          if (rand < 0.0625) value = 6;
          else if (rand < 0.375) value = 7;
          else if (rand < 0.8125) value = 8;
          else value = 9;
          type = value === 6 || value === 8 ? 0 : 1;
          break;
          
        default:
          value = Math.floor(Math.random() * 4) + 6;
          type = value % 2 === 0 ? 0 : 1;
      }
      
      lines.push({
        position: i + 1,
        value,
        type,
        isChanging: value === 6 || value === 9
      });
    }
    
    return lines;
  }

  getChangingLines(lines) {
    return lines.filter(line => line.isChanging).map(line => ({
      position: line.position,
      type: line.value === 6 ? 'Yin Mutante' : 'Yang Mutante'
    }));
  }

  calculateMutantLines(originalLines, changingLines) {
    const mutantLines = [...originalLines];
    
    changingLines.forEach(changing => {
      const index = changing.position - 1;
      mutantLines[index].type = mutantLines[index].type === 0 ? 1 : 0;
    });
    
    return mutantLines;
  }

  findHexagram(lines) {
    const lineString = lines.map(l => l.type).join('');
    const hexagram = this.hexagrams.find(h => 
      h.lines.join('') === lineString
    );
    
    return hexagram || this.hexagrams[0];
  }

  async animateFormation(lines) {
    const container = document.querySelector('.hexagram-lines');
    if (!container) return;
    
    container.innerHTML = '';
    
    // Criar linhas
    for (let i = 5; i >= 0; i--) {
      const line = lines[5 - i];
      const lineEl = document.createElement('div');
      lineEl.className = `formation-line ${line.type === 1 ? 'solid' : 'broken'}`;
      if (line.isChanging) lineEl.classList.add('mutating');
      container.appendChild(lineEl);
    }
    
    // Animar progresso
    for (let i = 0; i <= 6; i++) {
      const progress = (i / 6) * 100;
      
      if (this.progressFill) {
        this.progressFill.style.width = `${progress}%`;
      }
      
      if (this.progressPercent) {
        this.progressPercent.textContent = `${Math.round(progress)}%`;
      }
      
      if (i < 6) {
        if (this.progressText) {
          this.progressText.textContent = `Linha ${i + 1} de 6`;
        }
        
        if (this.formationStatus) {
          this.formationStatus.textContent = `Gerando linha ${i + 1}...`;
        }
        
        // Animar linha
        await new Promise(resolve => {
          const lineEl = container.children[i];
          lineEl.style.animation = 'lineForm 0.4s forwards';
          setTimeout(() => {
            // Atualizar símbolo
            const symbolSoFar = lines.slice(0, i + 1)
              .map(l => l.type === 1 ? '⚊' : '⚋')
              .reverse()
              .join('');
              
            if (this.formationSymbol) {
              this.formationSymbol.textContent = symbolSoFar;
            }
            resolve();
          }, 400);
        });
        
        await new Promise(resolve => setTimeout(resolve, 150));
      } else {
        if (this.progressText) {
          this.progressText.textContent = 'Completo!';
        }
        
        if (this.formationStatus) {
          this.formationStatus.textContent = 'Hexagrama formado';
        }
        
        // Mostrar símbolo completo
        const fullSymbol = lines.map(l => l.type === 1 ? '⚊' : '⚋').reverse().join('');
        
        if (this.formationSymbol) {
          this.formationSymbol.textContent = fullSymbol;
        }
        
        await new Promise(resolve => setTimeout(resolve, 600));
      }
    }
  }

  async revealConsultation(intention) {
    this.switchState('revelation');
    
    const h = this.currentHexagram;
    if (!h) return;
    
    // Atualizar dados básicos
    if (this.revealedNumber) {
      this.revealedNumber.textContent = h.number.toString().padStart(2, '0');
    }
    
    if (this.revealedName) {
      this.revealedName.textContent = h.name;
    }
    
    if (this.revealedSymbol) {
      this.revealedSymbol.textContent = h.lines.map(l => l === 1 ? '⚊' : '⚋').reverse().join('');
    }
    
    if (this.revealedImage) {
      this.revealedImage.textContent = h.image;
    }
    
    if (this.revealedInterpretation) {
      this.revealedInterpretation.textContent = h.interpretation;
    }
    
    // Método usado
    const methodNames = {
      coins: '3 Moedas',
      stalks: '50 Varetas',
      simple: 'Direto'
    };
    
    if (this.usedMethod) {
      this.usedMethod.textContent = methodNames[this.currentMethod];
    }
    
    // Data
    const now = new Date();
    if (this.consultationDate) {
      this.consultationDate.textContent = now.toLocaleDateString('pt-PT', {
        day: 'numeric',
        month: 'long'
      });
    }
    
    // Eco da intenção
    const truncated = intention.length > 100 
      ? intention.substring(0, 97) + '...' 
      : intention;
      
    if (this.intentionEcho) {
      this.intentionEcho.textContent = `«${truncated}»`;
    }
    
    // Transformação
    if (this.mutantHexagram && this.changingLines.length > 0) {
      if (this.transformationSection) {
        this.transformationSection.classList.remove('hidden');
      }
      
      if (this.originalSymbol) {
        this.originalSymbol.textContent = h.lines.map(l => l === 1 ? '⚊' : '⚋').reverse().join('');
      }
      
      if (this.resultSymbol) {
        this.resultSymbol.textContent = this.mutantHexagram.lines
          .map(l => l === 1 ? '⚊' : '⚋')
          .reverse()
          .join('');
      }
      
      if (this.transformationText) {
        this.transformationText.textContent = 
          `${this.changingLines.length} linha(s) mutante(s) transformam ${h.name} em ${this.mutantHexagram.name}.`;
      }
    } else {
      if (this.transformationSection) {
        this.transformationSection.classList.add('hidden');
      }
    }
    
    // Linhas mutantes
    if (this.changingLines.length > 0) {
      if (this.mutantsSection) {
        this.mutantsSection.classList.remove('hidden');
      }
      
      if (this.mutantsList) {
        this.mutantsList.innerHTML = this.changingLines
          .map(line => `
            <div class="mutant-item">
              Linha ${line.position}: ${line.type}
            </div>
          `)
          .join('');
      }
    } else {
      if (this.mutantsSection) {
        this.mutantsSection.classList.add('hidden');
      }
    }
    
    // Animar entrada
    await new Promise(resolve => setTimeout(resolve, 200));
  }

  saveConsultation(intention) {
    const consultation = {
      id: Date.now(),
      timestamp: new Date().toISOString(),
      date: new Date().toLocaleDateString('pt-PT'),
      time: new Date().toLocaleTimeString('pt-PT', { hour: '2-digit', minute: '2-digit' }),
      intention: this.sanitizeInput(intention),
      hexagram: this.currentHexagram.number,
      hexagramName: this.currentHexagram.name,
      method: this.currentMethod,
      changingLines: this.changingLines.map(l => l.position)
    };
    
    this.consultationHistory.unshift(consultation);
    this.userPattern.push(this.currentHexagram.number);
    
    // Limitar tamanho
    if (this.consultationHistory.length > this.MAX_HISTORY) {
      this.consultationHistory = this.consultationHistory.slice(0, this.MAX_HISTORY);
    }
    
    if (this.userPattern.length > this.MAX_PATTERN) {
      this.userPattern = this.userPattern.slice(-this.MAX_PATTERN);
    }
    
    // Salvar e atualizar
    this.saveUserData();
    this.updatePatternDisplay();
    this.loadHistoryDisplay();
  }

  saveToHistory() {
    if (!this.currentHexagram) return;
    
    // Já está salvo em saveConsultation, mas podemos dar feedback extra
    this.showToast('Consulta guardada no histórico', 'success');
  }

  switchState(state) {
    // Esconder todos
    [this.stateIntention, this.stateFormation, this.stateRevelation].forEach(s => {
      if (s) s.classList.remove('active');
    });
    
    // Mostrar atual
    const currentState = document.getElementById(`state-${state}`);
    if (currentState) {
      currentState.classList.add('active');
    }
  }

  resetToIntention() {
    this.switchState('intention');
    this.intentionInput.value = '';
    this.updateCharCount();
    this.validateIntention();
    this.intentionInput.focus();
    this.announce('Pronto para nova consulta');
  }

  // PAINEL LATERAL
  openPanel(tabName = 'library') {
    this.sidePanel.classList.remove('collapsed');
    this.panelOverlay.classList.add('active');
    document.body.style.overflow = 'hidden';
    
    // Muda para a aba especificada
    this.switchTab(tabName);
    
    // Focar no botão de fechar para acessibilidade
    setTimeout(() => {
      this.panelClose.focus();
    }, 100);
  }

  closePanel() {
    this.sidePanel.classList.add('collapsed');
    this.panelOverlay.classList.remove('active');
    document.body.style.overflow = '';
    
    // Focar no botão que abriu o painel
    if (document.activeElement === this.panelClose) {
      this.consoleLibrary.focus();
    }
  }

  switchTab(tabName) {
    // Atualizar abas
    this.panelTabs.forEach(tab => tab.classList.remove('active'));
    this.tabContents.forEach(content => content.classList.remove('active'));
    
    // Ativar selecionada
    const tabButton = document.querySelector(`[data-tab="${tabName}"]`);
    const tabContent = document.getElementById(`${tabName}Tab`);
    
    if (tabButton) tabButton.classList.add('active');
    if (tabContent) tabContent.classList.add('active');
    
    // Carregar conteúdo se necessário
    if (tabName === 'library') {
      this.loadHistoryDisplay();
      this.populateHexagramsGrid();
    }
  }

  setupLibrary() {
    this.populateHexagramsGrid();
    this.loadHistoryDisplay();
  }

  populateHexagramsGrid() {
    const grid = this.hexagramsGrid;
    if (!grid) return;
    
    grid.innerHTML = '';
    
    this.hexagrams.forEach(hexagram => {
      const card = document.createElement('div');
      card.className = 'hexagram-card';
      card.innerHTML = `
        <div class="hexagram-symbol-sm">
          ${hexagram.lines.map(l => l === 1 ? '⚊' : '⚋').reverse().join('')}
        </div>
        <div class="hexagram-number-sm">${hexagram.number.toString().padStart(2, '0')}</div>
        <div class="hexagram-name-sm">${hexagram.name}</div>
      `;
      
      card.addEventListener('click', () => {
        this.viewHexagram(hexagram);
      });
      
      // Acessibilidade
      card.setAttribute('role', 'button');
      card.setAttribute('tabindex', '0');
      card.setAttribute('aria-label', `Hexagrama ${hexagram.number}: ${hexagram.name}`);
      
      card.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          this.viewHexagram(hexagram);
        }
      });
      
      grid.appendChild(card);
    });
  }

  filterHexagrams(searchTerm) {
    const cards = this.hexagramsGrid.querySelectorAll('.hexagram-card');
    if (!cards.length) return;
    
    const term = searchTerm.toLowerCase().trim();
    
    cards.forEach(card => {
      const number = card.querySelector('.hexagram-number-sm').textContent;
      const name = card.querySelector('.hexagram-name-sm').textContent.toLowerCase();
      
      const matches = number.includes(term) || name.includes(term);
      card.style.display = matches ? 'flex' : 'none';
    });
  }

  viewHexagram(hexagram) {
    // Criar modal rápido
    const modal = document.createElement('div');
    modal.className = 'quick-view-modal';
    modal.setAttribute('role', 'dialog');
    modal.setAttribute('aria-labelledby', 'quickViewTitle');
    
    modal.innerHTML = `
      <div class="quick-view-header">
        <h3 id="quickViewTitle">${hexagram.number.toString().padStart(2, '0')} - ${hexagram.name}</h3>
        <button class="quick-view-close" aria-label="Fechar">&times;</button>
      </div>
      <div class="quick-view-body">
        <div class="hexagram-symbol-lg" style="text-align: center; margin: 1rem 0;">
          ${hexagram.lines.map(l => l === 1 ? '⚊' : '⚋').reverse().join('')}
        </div>
        <p><strong>Imagem:</strong> ${hexagram.image}</p>
        <p><strong>Interpretação:</strong> ${hexagram.interpretation}</p>
      </div>
      <div class="quick-view-footer">
        <button class="modal-btn primary" id="useHexagramBtn">
          Usar este Hexagrama
        </button>
      </div>
    `;
    
    document.body.appendChild(modal);
    
    // Fechar modal
    const closeBtn = modal.querySelector('.quick-view-close');
    closeBtn.addEventListener('click', () => {
      modal.remove();
    });
    
    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.remove();
      }
    });
    
    // Usar hexagrama
    const useBtn = modal.querySelector('#useHexagramBtn');
    useBtn.addEventListener('click', () => {
      this.useHexagram(hexagram.number);
      modal.remove();
    });
    
    // Focar no botão de fechar
    setTimeout(() => {
      closeBtn.focus();
    }, 50);
  }

  useHexagram(number) {
    const hexagram = this.hexagrams.find(h => h.number === number);
    if (!hexagram) return;
    
    // Definir como hexagrama atual
    this.currentHexagram = hexagram;
    this.mutantHexagram = null;
    this.changingLines = [];
    
    // Mostrar na tela de revelação
    this.revealConsultation('Consulta direta do hexagrama');
    this.switchState('revelation');
    
    // Fechar painel se estiver aberto
    this.closePanel();
    
    this.showToast(`Hexagrama ${number} carregado: ${hexagram.name}`, 'success');
    this.announce(`Hexagrama ${number} carregado: ${hexagram.name}`);
  }

  loadHistoryDisplay() {
    const list = this.historyList;
    if (!list) return;
    
    if (this.consultationHistory.length === 0) {
      list.innerHTML = `
        <div style="text-align: center; padding: 2rem; color: var(--text-muted);">
          <i class="fas fa-history" style="font-size: 1.5rem; margin-bottom: 0.5rem; opacity: 0.5;"></i>
          <p>Nenhuma consulta no histórico</p>
        </div>
      `;
      return;
    }
    
    list.innerHTML = this.consultationHistory
      .slice(0, 20) // Mostrar apenas os 20 mais recentes
      .map(item => {
        const hexagram = this.hexagrams.find(h => h.number === item.hexagram);
        const intention = item.intention || 'Sem intenção registada';
        const truncated = intention.length > 60 ? intention.substring(0, 57) + '...' : intention;
        
        return `
          <div class="history-item" data-id="${item.id}" tabindex="0" role="button">
            <div class="history-date">${item.date} ${item.time}</div>
            <div class="history-intention">${truncated}</div>
            <div class="history-hexagram">
              <span>${hexagram ? hexagram.lines.map(l => l === 1 ? '⚊' : '⚋').reverse().join('') : '?'}</span>
              <span>${hexagram ? `${hexagram.number} - ${hexagram.name}` : 'Desconhecido'}</span>
            </div>
          </div>
        `;
      })
      .join('');
    
    // Event listeners
    list.querySelectorAll('.history-item').forEach(item => {
      item.addEventListener('click', () => {
        const id = parseInt(item.dataset.id);
        this.loadFromHistory(id);
      });
      
      item.addEventListener('keydown', (e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault();
          const id = parseInt(item.dataset.id);
          this.loadFromHistory(id);
        }
      });
    });
  }

  loadFromHistory(id) {
    const item = this.consultationHistory.find(i => i.id === id);
    if (!item) return;
    
    // Carregar dados
    this.currentHexagram = this.hexagrams.find(h => h.number === item.hexagram);
    this.currentMethod = item.method;
    this.selectMethod(item.method);
    
    // Revelar consulta
    this.revealConsultation(item.intention);
    this.switchState('revelation');
    
    // Fechar painel
    this.closePanel();
    
    this.showToast('Consulta carregada do histórico', 'success');
  }

  updatePatternDisplay() {
    // Estatísticas
    if (this.totalConsults) {
      this.totalConsults.textContent = this.consultationHistory.length;
    }
    
    // Hexagrama mais frequente
    if (this.userPattern.length > 0) {
      const counts = {};
      this.userPattern.forEach(num => {
        counts[num] = (counts[num] || 0) + 1;
      });
      
      const mostFrequent = Object.entries(counts)
        .reduce((a, b) => a[1] > b[1] ? a : b, [null, 0]);
      
      if (mostFrequent[0]) {
        const hexagram = this.hexagrams.find(h => h.number == mostFrequent[0]);
        if (this.dominantPattern && hexagram) {
          this.dominantPattern.textContent = hexagram.name.split(' ')[0];
        }
      }
    }
    
    // Chips
    if (this.patternChips) {
      this.patternChips.innerHTML = '';
      this.userPattern.slice(-6).forEach(num => {
        const hexagram = this.hexagrams.find(h => h.number === num);
        if (hexagram) {
          const chip = document.createElement('div');
          chip.className = 'pattern-chip';
          chip.textContent = hexagram.number;
          chip.title = `${hexagram.number} - ${hexagram.name}`;
          chip.setAttribute('tabindex', '0');
          chip.setAttribute('role', 'button');
          chip.setAttribute('aria-label', `Hexagrama ${hexagram.number}`);
          
          chip.addEventListener('click', () => {
            this.viewHexagram(hexagram);
          });
          
          chip.addEventListener('keydown', (e) => {
            if (e.key === 'Enter' || e.key === ' ') {
              e.preventDefault();
              this.viewHexagram(hexagram);
            }
          });
          
          this.patternChips.appendChild(chip);
        }
      });
    }
  }

  // MODAIS
  openExportModal() {
    this.exportModal.classList.add('active');
    this.selectExportType('all');
  }

  closeModal(modal) {
    modal.classList.remove('active');
  }

  closeAllModals() {
    [this.exportModal, this.importModal].forEach(modal => {
      this.closeModal(modal);
    });
  }

  selectExportType(type) {
    this.exportOptions.forEach(opt => opt.classList.remove('active'));
    const selected = document.querySelector(`[data-type="${type}"]`);
    if (selected) selected.classList.add('active');
    
    // Gerar preview
    this.generateExportPreview(type);
  }

  generateExportPreview(type) {
    if (!this.exportPreview) return;
    
    let data = {
      version: 'IChingMetaverso_v3.2',
      exportDate: new Date().toISOString()
    };
    
    switch(type) {
      case 'all':
        data.history = this.consultationHistory;
        data.pattern = this.userPattern;
        break;
      case 'history':
        data.history = this.consultationHistory;
        break;
      case 'pattern':
        data.pattern = this.userPattern;
        break;
    }
    
    this.exportPreview.textContent = JSON.stringify(data, null, 2);
  }

  copyExportData() {
    const text = this.exportPreview.textContent;
    
    navigator.clipboard.writeText(text)
      .then(() => {
        this.showToast('Dados copiados para a área de transferência', 'success');
      })
      .catch(() => {
        // Fallback para navegadores mais antigos
        const textArea = document.createElement('textarea');
        textArea.value = text;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        this.showToast('Dados copiados para a área de transferência', 'success');
      });
  }

  downloadExportData() {
    const data = JSON.parse(this.exportPreview.textContent);
    const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = `iching-metaverso-${new Date().toISOString().slice(0, 10)}.json`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
    
    this.showToast('Download iniciado', 'success');
  }

  importData() {
    try {
      const data = JSON.parse(this.importData.value);
      
      if (!data.version || !data.version.includes('IChingMetaverso')) {
        throw new Error('Formato de dados inválido');
      }
      
      if (data.history) {
        this.consultationHistory = data.history.slice(0, this.MAX_HISTORY);
      }
      
      if (data.pattern) {
        this.userPattern = data.pattern.slice(-this.MAX_PATTERN);
      }
      
      // Atualizar
      this.updatePatternDisplay();
      this.loadHistoryDisplay();
      this.saveUserData();
      
      // Fechar modal
      this.closeModal(this.importModal);
      this.showToast('Dados importados com sucesso', 'success');
      
    } catch (error) {
      this.showToast(`Erro: ${error.message}`, 'danger');
    }
  }

  clearHistoryData() {
    this.consultationHistory = [];
    this.userPattern = [];
    this.saveUserData();
    this.updatePatternDisplay();
    this.loadHistoryDisplay();
    this.showToast('Histórico limpo', 'info');
  }

  // COMPARTILHAMENTO
  async shareConsultation() {
    if (!this.currentHexagram) return;
    
    const shareData = {
      title: `I Ching - ${this.currentHexagram.name}`,
      text: `Hexagrama ${this.currentHexagram.number}: ${this.currentHexagram.name}\n\n${this.currentHexagram.image}`,
      url: window.location.href
    };
    
    if (navigator.share) {
      try {
        await navigator.share(shareData);
        this.showToast('Consulta partilhada', 'success');
      } catch (err) {
        this.copyToClipboard();
      }
    } else {
      this.copyToClipboard();
    }
  }

  async copyToClipboard() {
    if (!this.currentHexagram) return;
    
    const text = `I Ching - ${this.currentHexagram.name}
Hexagrama ${this.currentHexagram.number}

${this.currentHexagram.image}

${this.currentHexagram.interpretation}

Via I Ching Metaverso`;

    try {
      await navigator.clipboard.writeText(text);
      this.showToast('Consulta copiada para a área de transferência', 'success');
    } catch (err) {
      // Fallback
      const textArea = document.createElement('textarea');
      textArea.value = text;
      document.body.appendChild(textArea);
      textArea.select();
      document.execCommand('copy');
      document.body.removeChild(textArea);
      this.showToast('Consulta copiada para a área de transferência', 'success');
    }
  }

  // UTILIDADES
  showToast(message, type = 'info') {
    const icons = {
      success: 'fas fa-check-circle',
      error: 'fas fa-exclamation-circle',
      warning: 'fas fa-exclamation-triangle',
      info: 'fas fa-info-circle',
      danger: 'fas fa-times-circle'
    };
    
    const colors = {
      success: 'var(--success)',
      error: 'var(--danger)',
      warning: 'var(--warning)',
      info: 'var(--info)',
      danger: 'var(--danger)'
    };
    
    if (this.toastIcon) {
      this.toastIcon.className = `toast-icon ${icons[type] || icons.info}`;
      this.toastIcon.style.color = colors[type] || colors.info;
    }
    
    if (this.toastMessage) {
      this.toastMessage.textContent = message;
    }
    
    this.toastContainer.classList.add('active');
    
    setTimeout(() => {
      this.toastContainer.classList.remove('active');
    }, 3000);
  }

  announce(message) {
    if (this.liveAnnouncements) {
      this.liveAnnouncements.textContent = message;
      
      // Limpar após 2 segundos
      setTimeout(() => {
        this.liveAnnouncements.textContent = '';
      }, 2000);
    }
  }

  sanitizeInput(text) {
    // Sanitização básica para prevenir XSS
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }

  saveUserData() {
    const data = {
      consultationHistory: this.consultationHistory,
      userPattern: this.userPattern,
      version: '3.2',
      lastSaved: new Date().toISOString()
    };
    
    try {
      localStorage.setItem('ichingMetaverseData', JSON.stringify(data));
    } catch (error) {
      console.warn('Erro ao salvar dados:', error);
      // Se storage estiver cheio, remove os mais antigos
      if (error.name === 'QuotaExceededError') {
        this.consultationHistory = this.consultationHistory.slice(0, 50);
        this.userPattern = this.userPattern.slice(0, 10);
        this.saveUserData(); // Tentar novamente
      }
    }
  }

  loadUserData() {
    try {
      const saved = localStorage.getItem('ichingMetaverseData');
      if (saved) {
        const data = JSON.parse(saved);
        
        if (data.version && data.version.startsWith('3.')) {
          this.consultationHistory = data.consultationHistory || [];
          this.userPattern = data.userPattern || [];
        }
      }
    } catch (error) {
      console.warn('Erro ao carregar dados:', error);
      this.consultationHistory = [];
      this.userPattern = [];
    }
  }
}

// Inicializar
document.addEventListener('DOMContentLoaded', () => {
  try {
    window.ichingMetaverse = new IChingMetaverse();
    console.log('I Ching Metaverso v3.2 iniciado com sucesso');
  } catch (error) {
    console.error('Erro ao iniciar I Ching Metaverso:', error);
    alert('Ocorreu um erro ao carregar a aplicação. Por favor, recarregue a página.');
  }
});

// Adicionar CSS para o modal rápido
const quickViewCSS = `
.quick-view-modal {
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background: var(--bg-surface);
  border: 2px solid var(--accent);
  border-radius: var(--border-radius-lg);
  padding: var(--spacing-lg);
  z-index: 2001;
  max-width: 500px;
  width: 90%;
  max-height: 80vh;
  overflow-y: auto;
  box-shadow: var(--shadow-lg);
}

.quick-view-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: var(--spacing-md);
  border-bottom: 1px solid rgba(218, 165, 32, 0.3);
  padding-bottom: var(--spacing-sm);
}

.quick-view-close {
  background: none;
  border: none;
  color: var(--text-secondary);
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0;
  width: 30px;
  height: 30px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: var(--border-radius-sm);
}

.quick-view-close:hover {
  background: var(--danger);
  color: white;
}

.quick-view-body {
  margin-bottom: var(--spacing-md);
}

.quick-view-body p {
  margin-bottom: var(--spacing-sm);
  line-height: 1.4;
}

.quick-view-footer {
  text-align: center;
}
`;

// Adicionar estilo ao documento
const style = document.createElement('style');
style.textContent = quickViewCSS;
document.head.appendChild(style);