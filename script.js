    // ============ SISTEMA DE MENU ============
    const menuIcon = document.getElementById("menuIcon");
    const menu = document.getElementById("menu");

    menuIcon.addEventListener("click", function(e) {
        e.stopPropagation();
        menu.classList.toggle("active");
        menuIcon.classList.toggle("active");
    });

    document.addEventListener("click", function(e) {
        if (!menu.contains(e.target) && !menuIcon.contains(e.target)) {
            menu.classList.remove("active");
            menuIcon.classList.remove("active");
        }
    });

    document.querySelectorAll(".menu-item").forEach(item => {
        item.addEventListener("mouseenter", function() {
            this.style.transform = "translateY(-3px)";
        });
        item.addEventListener("mouseleave", function() {
            this.style.transform = "translateY(0)";
        });
    });

// script.js
class IChingConsultant {
    constructor() {
        this.hexagrams = this.createHexagrams();
        this.currentHexagram = null;
        this.changingLines = [];
        this.isCasting = false;
        
        this.initialize();
    }

    initialize() {
        document.getElementById('cast-btn').addEventListener('click', () => this.castHexagram());
        document.getElementById('new-consult-btn').addEventListener('click', () => this.resetConsult());
    }

    createHexagrams() {
        return [
            {
                number: 1,
                name: "O Criativo",
                lines: [1,1,1,1,1,1],
                interpretation: "Força criativa em ação. Tempo de liderança e iniciativa. Aproveite o momento propício para novos começos."
            },
            {
                number: 2,
                name: "O Receptivo",
                lines: [0,0,0,0,0,0],
                interpretation: "Cultive a flexibilidade e adaptabilidade. Receba as influências do ambiente antes de agir."
            },
            {
                number: 3,
                name: "Dificuldade Inicial",
                lines: [1,0,0,0,1,0],
                interpretation: "Período de desafios e obstáculos. Persistência e planejamento cuidadoso são essenciais."
            },
            {
                number: 4,
                name: "Insensatez Juvenil",
                lines: [0,1,0,0,0,1],
                interpretation: "Momento de aprendizagem através da experiência. Evite precipitação e busque orientação."
            },
            {
                number: 5,
                name: "Espera",
                lines: [1,1,1,0,1,0],
                interpretation: "Paciência necessária. Ação prematura traria riscos. Prepare-se silenciosamente."
            },
            {
                number: 6,
                name: "Conflito",
                lines: [0,1,0,1,1,1],
                interpretation: "Evite confrontos diretos. Busque soluções diplomáticas e mediação."
            },
            {
                number: 7,
                name: "O Exército",
                lines: [0,0,1,0,1,0],
                interpretation: "Organização e disciplina necessárias. Liderança clara traz sucesso."
            },
            {
                number: 8,
                name: "União",
                lines: [0,1,0,0,0,0],
                interpretation: "Cooperação é fundamental. Busque alianças benéficas e relações harmoniosas."
            },
            {
                number: 9,
                name: "Pequeno Acúmulo",
                lines: [1,1,1,0,1,1],
                interpretation: "Progresso gradual. Concentre-se em pequenos passos consistentes."
            },
            {
                number: 10,
                name: "Caminhada",
                lines: [1,1,0,1,1,1],
                interpretation: "Atenção às ações cotidianas. Integridade pessoal trará reconhecimento."
            },
            {
                number: 11,
                name: "Paz",
                lines: [1,1,1,0,0,0],
                interpretation: "Harmonia e prosperidade. Aproveite para consolidar posições."
            },
            {
                number: 12,
                name: "Estagnação",
                lines: [0,0,0,1,1,1],
                interpretation: "Comunicação difícil. Evite tomar grandes decisões neste período."
            },
            {
                number: 13,
                name: "Comunhão",
                lines: [1,0,1,1,1,1],
                interpretation: "Sucesso através da colaboração. Busque interesses comuns."
            },
            {
                number: 14,
                name: "Grande Possessão",
                lines: [1,1,1,1,0,1],
                interpretation: "Tempo de abundância. Compartilhe recursos para manter equilíbrio."
            },
            {
                number: 15,
                name: "Modéstia",
                lines: [0,0,0,0,1,0],
                interpretation: "Evite ostentação. Verdadeira força reside na humildade."
            },
            {
                number: 16,
                name: "Entusiasmo",
                lines: [0,0,1,0,0,0],
                interpretation: "Energia para novos projetos. Inspire outros com sua visão."
            },
            {
                number: 17,
                name: "Seguir",
                lines: [1,0,0,1,1,0],
                interpretation: "Adapte-se às circunstâncias. Encontre o fluxo natural dos eventos."
            },
            {
                number: 18,
                name: "Trabalho Corretivo",
                lines: [0,1,1,0,0,1],
                interpretation: "Identifique e corrija problemas subjacentes. Persistência necessária."
            },
            {
                number: 19,
                name: "Aproximação",
                lines: [1,1,0,0,0,0],
                interpretation: "Crescimento gradual. Desenvolvimento através de influências positivas."
            },
            {
                number: 20,
                name: "Contemplação",
                lines: [0,0,0,0,1,1],
                interpretation: "Momento de reflexão. Observe atentamente antes de agir."
            },
            {
                number: 21,
                name: "Mordida que Unifica",
                lines: [1,0,0,1,0,1],
                interpretation: "Resolução de conflitos através de ação decisiva. Justiça necessária."
            },
            {
                number: 22,
                name: "Graça",
                lines: [1,0,1,1,0,1],
                interpretation: "Valorize a forma e a aparência. Cultive a beleza nas ações."
            },
            {
                number: 23,
                name: "Desintegração",
                lines: [0,0,0,0,0,1],
                interpretation: "Tempo de preservação. Evite iniciativas arriscadas."
            },
            {
                number: 24,
                name: "Retorno",
                lines: [1,0,0,0,0,0],
                interpretation: "Renovação cíclica. Oportunidades perdidas podem retornar."
            },
            {
                number: 25,
                name: "Inocência",
                lines: [1,0,0,1,1,1],
                interpretation: "Ação espontânea e natural. Confie na intuição pura."
            },
            {
                number: 26,
                name: "Grande Acumulação",
                lines: [1,1,1,0,0,1],
                interpretation: "Controle de recursos. Disciplina traz sucesso duradouro."
            },
            {
                number: 27,
                name: "Nutrição",
                lines: [1,0,0,0,0,1],
                interpretation: "Cuide de si mesmo e dos outros. Atenção às necessidades básicas."
            },
            {
                number: 28,
                name: "Grande Preponderância",
                lines: [0,1,1,1,1,0],
                interpretation: "Momento crítico. Ações extraordinárias podem ser necessárias."
            },
            {
                number: 29,
                name: "O Abismal",
                lines: [0,1,0,0,1,0],
                interpretation: "Perigo à frente. Mantenha a calma e siga com cautela."
            },
            {
                number: 30,
                name: "Aderir",
                lines: [1,0,1,1,0,1],
                interpretation: "Clareza e iluminação. Busque compreensão e esclarecimento."
            },
            {
                number: 31,
                name: "Influência",
                lines: [0,0,1,1,1,0],
                interpretation: "Atração natural. Relações interpessoais em destaque."
            },
            {
                number: 32,
                name: "Constância",
                lines: [0,1,1,1,0,0],
                interpretation: "Estabilidade através da rotina. Mantenha o curso estabelecido."
            },
            {
                number: 33,
                name: "Retirada",
                lines: [0,0,1,1,1,1],
                interpretation: "Momento estratégico para recuar. Preserve recursos para lutas futuras."
            },
            {
                number: 34,
                name: "Poder do Grande",
                lines: [1,1,1,1,0,0],
                interpretation: "Use a força com sabedoria. Evite excessos e arrogância."
            },
            {
                number: 35,
                name: "Progresso",
                lines: [0,0,0,1,0,1],
                interpretation: "Crescimento constante. Reconhecimento público possível."
            },
            {
                number: 36,
                name: "Ocultação da Luz",
                lines: [1,0,1,0,0,0],
                interpretation: "Adversidade temporária. Mantenha princípios internos."
            },
            {
                number: 37,
                name: "Família",
                lines: [1,0,1,1,1,0],
                interpretation: "Fortaleça laços domésticos. Base estável para ações futuras."
            },
            {
                number: 38,
                name: "Oposição",
                lines: [0,1,1,0,1,0],
                interpretation: "Diferenças de perspectiva. Busque terreno comum."
            },
            {
                number: 39,
                name: "Obstrução",
                lines: [0,0,1,0,1,0],
                interpretation: "Dificuldades no caminho. Paciência e persistência necessárias."
            },
            {
                number: 40,
                name: "Libertação",
                lines: [0,1,0,0,1,0],
                interpretation: "Alívio após tensão. Oportunidade para recomeçar."
            },
            {
                number: 41,
                name: "Diminuição",
                lines: [1,1,0,0,0,1],
                interpretation: "Tempo de perdas controladas. Foco no essencial."
            },
            {
                number: 42,
                name: "Aumento",
                lines: [1,0,0,0,1,1],
                interpretation: "Expansão benéfica. Compartilhe ganhos com outros."
            },
            {
                number: 43,
                name: "Determinação",
                lines: [1,1,1,1,1,0],
                interpretation: "Momento decisivo. Ação resoluta contra obstáculos."
            },
            {
                number: 44,
                name: "Encontro",
                lines: [0,1,1,1,1,1],
                interpretation: "Influências inesperadas. Cuidado com associações precipitadas."
            },
            {
                number: 45,
                name: "Reunião",
                lines: [0,0,0,1,1,0],
                interpretation: "União de forças. Liderança clara necessária para harmonia."
            },
            {
                number: 46,
                name: "Ascensão",
                lines: [0,1,1,0,0,0],
                interpretation: "Crescimento contínuo. Desenvolvimento gradual e estável."
            },
            {
                number: 47,
                name: "Esgotamento",
                lines: [0,1,0,1,1,0],
                interpretation: "Tempo de restrição. Foco na autopreservação."
            },
            {
                number: 48,
                name: "O Poço",
                lines: [0,1,1,0,1,0],
                interpretation: "Recursos internos sustentáveis. Mantenha fontes de renovação."
            },
            {
                number: 49,
                name: "Revolução",
                lines: [1,0,1,1,0,0],
                interpretation: "Mudança radical necessária. Rompa padrões obsoletos."
            },
            {
                number: 50,
                name: "O Caldeirão",
                lines: [0,0,1,1,0,1],
                interpretation: "Transformação cultural. Nutrir valores e tradições."
            },
            {
                number: 51,
                name: "O Trovão",
                lines: [1,0,0,1,0,0],
                interpretation: "Eventos surpreendentes. Mantenha a serenidade interior."
            },
            {
                number: 52,
                name: "A Montanha",
                lines: [0,0,1,0,0,1],
                interpretation: "Imobilidade temporária. Contemplação e introspecção."
            },
            {
                number: 53,
                name: "Desenvolvimento Gradual",
                lines: [0,0,1,0,1,1],
                interpretation: "Progresso estável. Avance como a árvore que cresce."
            },
            {
                number: 54,
                name: "A Jovem que Casa",
                lines: [1,1,0,1,0,0],
                interpretation: "Adaptação a novos papéis. Equilíbrio em transições."
            },
            {
                number: 55,
                name: "Abundância",
                lines: [1,0,1,0,1,1],
                interpretation: "Culminação bem-sucedida. Aproveite o auge com moderação."
            },
            {
                number: 56,
                name: "O Viajante",
                lines: [0,0,1,1,0,1],
                interpretation: "Tempo de mobilidade. Adapte-se a ambientes desconhecidos."
            },
            {
                number: 57,
                name: "O Suave",
                lines: [0,1,1,0,1,1],
                interpretation: "Influência persistente. Ação através da penetração suave."
            },
            {
                number: 58,
                name: "O Alegre",
                lines: [1,1,0,1,1,0],
                interpretation: "Comunicação aberta. Alegria compartilhada traz benefícios."
            },
            {
                number: 59,
                name: "Dissolução",
                lines: [0,1,0,0,0,1],
                interpretation: "Supere divisões. Restaure a união através da compreensão."
            },
            {
                number: 60,
                name: "Limitação",
                lines: [0,0,1,0,1,0],
                interpretation: "Estabeleça fronteiras claras. Disciplina traz liberdade."
            },
            {
                number: 61,
                name: "Verdade Interior",
                lines: [1,1,0,0,1,1],
                interpretation: "Autenticidade essencial. Confie na intuição profunda."
            },
            {
                number: 62,
                name: "Pequeno Excesso",
                lines: [0,0,1,1,1,0],
                interpretation: "Atenção aos detalhes. Modéstia nas ações."
            },
            {
                number: 63,
                name: "Depois da Conclusão",
                lines: [1,0,1,0,1,0],
                interpretation: "Ciclo completo. Mantenha vigilância para novos começos."
            },
            {
                number: 64,
                name: "Antes da Conclusão",
                lines: [0,1,0,1,0,1],
                interpretation: "Transição iminente. Prepare-se cuidadosamente para o próximo passo."
            }
        ];
    }

    async castHexagram() {
        if (this.isCasting) return;
        this.isCasting = true;
        
        try {
            const lines = this.generateLines();
            await this.animateLines(lines);
            this.currentHexagram = this.findHexagram(lines);
            await this.showInterpretation();
        } finally {
            this.isCasting = false;
        }
    }

    generateLines() {
        const lines = [];
        this.changingLines = [];
        
        for(let i = 0; i < 6; i++) {
            const sum = Math.floor(Math.random() * 3) + 6; // 6-9
            lines.push(sum % 2 === 0 ? 0 : 1);
            if(sum === 6 || sum === 9) this.changingLines.push(i);
        }
        return lines;
    }

    async animateLines(lines) {
        const container = document.querySelector('.hexagram-lines');
        container.innerHTML = '';
        
        for(let i = 5; i >= 0; i--) {
            const lineDiv = document.createElement('div');
            lineDiv.className = `hexagram-line ${lines[i] ? 'solid' : 'broken'} hidden`;
            container.appendChild(lineDiv);
            
            await new Promise(resolve => setTimeout(resolve, 300));
            lineDiv.classList.remove('hidden');
            
            if(this.changingLines.includes(i)) {
                lineDiv.classList.add('changing');
            }
        }
    }

    findHexagram(lines) {
        const lineString = lines.join('');
        return this.hexagrams.find(h => h.lines.join('') === lineString) || this.hexagrams[0];
    }

    async showInterpretation() {
        document.getElementById('consult-panel').classList.add('hidden');
        document.getElementById('result-panel').classList.remove('hidden');
        
        document.getElementById('hexagram-title').textContent = 
            `${this.currentHexagram.number}. ${this.currentHexagram.name}`;
        
        document.getElementById('hexagram-interpretation').textContent = 
            this.currentHexagram.interpretation;
        
        document.getElementById('hexagram-symbol').textContent = 
            this.getHexagramSymbol(this.currentHexagram.lines);
    }

    getHexagramSymbol(lines) {
        return lines.map(line => line ? '⚊' : '⚋').reverse().join('');
    }

    resetConsult() {
        document.getElementById('result-panel').classList.add('hidden');
        document.getElementById('consult-panel').classList.remove('hidden');
        document.getElementById('question-input').value = '';
        document.querySelector('.hexagram-lines').innerHTML = '';
        this.currentHexagram = null;
        this.changingLines = [];
    }
}

new IChingConsultant();
