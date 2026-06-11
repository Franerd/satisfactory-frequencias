const ITEMS = [
  {
    "item": "Ácido Nítrico",
    "freq": "5832",
    "image": "img/acido-nitrico.png",
    "freqNum": 5832
  },
  {
    "item": "Ácido Sulfúrico",
    "freq": "7631",
    "image": "img/acido-sulfurico.png",
    "freqNum": 7631
  },
  {
    "item": "Água",
    "freq": "2473",
    "image": "img/agua.png",
    "freqNum": 2473
  },
  {
    "item": "Armação Modular",
    "freq": "8265",
    "image": "img/armacao-modular.png",
    "freqNum": 8265
  },
  {
    "item": "Armação Modular Pesada",
    "freq": "2175",
    "image": "img/armacao-modular-pesada.png",
    "freqNum": 2175
  },
  {
    "item": "Armação Modular Reforçada",
    "freq": "8741",
    "image": "img/armacao-modular-reforcada.png",
    "freqNum": 8741
  },
  {
    "item": "Barra de Combustível de Ficsônio",
    "freq": "7439",
    "image": "img/barra-de-combustivel-de-ficsonio.png",
    "freqNum": 7439
  },
  {
    "item": "Barra de Combustível de Plutônio",
    "freq": "9384",
    "image": "img/barra-de-combustivel-de-plutonio.png",
    "freqNum": 9384
  },
  {
    "item": "Barra de Combustível de Urânio",
    "freq": "1724",
    "image": "img/barra-de-combustivel-de-uranio.png",
    "freqNum": 1724
  },
  {
    "item": "Barra de Controle Eletromagnética",
    "freq": "1429",
    "image": "img/barra-de-controle-eletromagnetica.png",
    "freqNum": 1429
  },
  {
    "item": "Barra de Ferro",
    "freq": "1048",
    "image": "img/barra-de-ferro.png",
    "freqNum": 1048
  },
  {
    "item": "Barril de Resíduo Pesado de Petróleo",
    "freq": "3819",
    "image": "img/barril-de-residuo-pesado-de-petroleo.png",
    "freqNum": 3819
  },
  {
    "item": "Bateria",
    "freq": "2311",
    "image": "img/bateria-1.png",
    "freqNum": 2311
  },
  {
    "item": "Bauxita",
    "freq": "4672",
    "image": "img/bauxita-1.png",
    "freqNum": 4672
  },
  {
    "item": "Biocombustível Líquido",
    "freq": "2397",
    "image": "img/biocombustivel-liquido.png",
    "freqNum": 2397
  },
  {
    "item": "Biocombustível Sólido",
    "freq": "2786",
    "image": "img/biocombustivel-solido.png",
    "freqNum": 2786
  },
  {
    "item": "Biomassa",
    "freq": "1235",
    "image": "img/biomassa-1.png",
    "freqNum": 1235
  },
  {
    "item": "Borracha",
    "freq": "3726",
    "image": "img/borracha-1.png",
    "freqNum": 3726
  },
  {
    "item": "Cabo",
    "freq": "1157",
    "image": "img/cabo-1.png",
    "freqNum": 1157
  },
  {
    "item": "Calcário",
    "freq": "2563",
    "image": "img/calcario.png",
    "freqNum": 2563
  },
  {
    "item": "Cápsula de DNA Alienígena",
    "freq": "9475",
    "image": "img/capsula-de-dna-alienigena.png",
    "freqNum": 9475
  },
  {
    "item": "Carcaça de Alumínio",
    "freq": "1427 / 333",
    "image": "img/carcaca-de-aluminio.png",
    "freqNum": 0
  },
  {
    "item": "Cartucho de Cor",
    "freq": "6372",
    "image": "img/cartucho-de-cor.png",
    "freqNum": 6372
  },
  {
    "item": "Carvão",
    "freq": "5219",
    "image": "img/carvao.png",
    "freqNum": 5219
  },
  {
    "item": "Carvão Compactado",
    "freq": "1854",
    "image": "img/carvao-compactado.png",
    "freqNum": 1854
  },
  {
    "item": "Célula de Plutônio Revestida",
    "freq": "1924",
    "image": "img/celula-de-plutonio-revestida.png",
    "freqNum": 1924
  },
  {
    "item": "Célula de Singularidade",
    "freq": "7249",
    "image": "img/celula-de-singularidade.png",
    "freqNum": 7249
  },
  {
    "item": "Célula de Urânio Revestida",
    "freq": "3821",
    "image": "img/celula-de-uranio-revestida.png",
    "freqNum": 3821
  },
  {
    "item": "Célula fotovoltaica",
    "freq": "5569",
    "image": "img/celula-fotovoltaica.png",
    "freqNum": 5569
  },
  {
    "item": "Chapa Avançada",
    "freq": "4278",
    "image": "img/chapa-avancada.png",
    "freqNum": 4278
  },
  {
    "item": "Chapa de Cobre",
    "freq": "2931",
    "image": "img/chapa-de-cobre.png",
    "freqNum": 2931
  },
  {
    "item": "Chapa de Duralumínio",
    "freq": "1824",
    "image": "img/chapa-de-duraluminio.png",
    "freqNum": 1824
  },
  {
    "item": "Chapa de Ferro",
    "freq": "2932",
    "image": "img/chapa-de-ferro.png",
    "freqNum": 2932
  },
  {
    "item": "Chapa de Ferro Reforçada",
    "freq": "4278",
    "image": "img/chapa-de-ferro-reforcada.png",
    "freqNum": 4278
  },
  {
    "item": "Cilindro de CO2",
    "freq": "3412",
    "image": "img/cilindro-de-co2.png",
    "freqNum": 3412
  },
  {
    "item": "Combustível",
    "freq": "6713",
    "image": "img/combustivel.png",
    "freqNum": 6713
  },
  {
    "item": "Combustível de Foguete",
    "freq": "5719",
    "image": "img/combustivel-de-foguete.png",
    "freqNum": 5719
  },
  {
    "item": "Combustível Ionizado",
    "freq": "9218",
    "image": "img/combustivel-ionizado.png",
    "freqNum": 9218
  },
  {
    "item": "Computador",
    "freq": "4723 / 4722",
    "image": "img/computador-1.png",
    "freqNum": 0
  },
  {
    "item": "Concreto",
    "freq": "2591",
    "image": "img/concreto-1.png",
    "freqNum": 2591
  },
  {
    "item": "Conector de Alta Velocidade",
    "freq": "3927",
    "image": "img/conector-de-alta-velocidade.png",
    "freqNum": 3927
  },
  {
    "item": "Coque de Petróleo",
    "freq": "8271",
    "image": "img/coque-de-petroleo.png",
    "freqNum": 8271
  },
  {
    "item": "Cristal de Matéria Escura",
    "freq": "8402",
    "image": "img/cristal-de-materia-escura.png",
    "freqNum": 8402
  },
  {
    "item": "Cristal de Quartzo",
    "freq": "7523",
    "image": "img/cristal-de-quartzo.png",
    "freqNum": 7523
  },
  {
    "item": "Cronocristal",
    "freq": "7398",
    "image": "img/cronocristal-1.png",
    "freqNum": 7398
  },
  {
    "item": "Cubo de Conversão de Pressão",
    "freq": "1428",
    "image": "img/cubo-de-conversao-de-pressao.png",
    "freqNum": 1428
  },
  {
    "item": "Cupom FICSIT",
    "freq": "5064",
    "image": "img/cupom-ficsit.png",
    "freqNum": 5064
  },
  {
    "item": "Diamantes",
    "freq": "9512",
    "image": "img/diamantes-1.png",
    "freqNum": 9512
  },
  {
    "item": "Dissipador de Calor",
    "freq": "4932",
    "image": "img/dissipador-de-calor.png",
    "freqNum": 4932
  },
  {
    "item": "DT Reactor Core",
    "freq": "9835",
    "image": "img/dt-reactor-core.png",
    "freqNum": 9835
  },
  {
    "item": "Enxofre",
    "freq": "5726",
    "image": "img/enxofre-1.png",
    "freqNum": 5726
  },
  {
    "item": "Escultor Bioquímico",
    "freq": "8751",
    "image": "img/escultor-bioquimico.png",
    "freqNum": 8751
  },
  {
    "item": "Estator",
    "freq": "3219",
    "image": "img/estator-1.png",
    "freqNum": 3219
  },
  {
    "item": "Estilhaço de Energia",
    "freq": "8157",
    "image": "img/estilhaco-de-energia.png",
    "freqNum": 8157
  },
  {
    "item": "Estrutura Versátil",
    "freq": "9147",
    "image": "img/estrutura-versatil.png",
    "freqNum": 9147
  },
  {
    "item": "Fiação Automatizada",
    "freq": "3267",
    "image": "img/fiacao-automatizada.png",
    "freqNum": 3267
  },
  {
    "item": "Ficsônio",
    "freq": "1293",
    "image": "img/ficsonio.png",
    "freqNum": 1293
  },
  {
    "item": "Filtro com Infusão de Iodo",
    "freq": "2956",
    "image": "img/filtro-com-infusao-de-iodo.png",
    "freqNum": 2956
  },
  {
    "item": "Filtros de Gás",
    "freq": "2957",
    "image": "img/filtros-de-gas.png",
    "freqNum": 2957
  },
  {
    "item": "Fio",
    "freq": "4631",
    "image": "img/fio-1.png",
    "freqNum": 4631
  },
  {
    "item": "Fio-Veloz",
    "freq": "5728",
    "image": "img/fio-veloz-1.png",
    "freqNum": 5728
  },
  {
    "item": "Flutuador de MAE",
    "freq": "7854",
    "image": "img/flutuador-de-mae.png",
    "freqNum": 7854
  },
  {
    "item": "Foguete de Propulsão Térmica",
    "freq": "1832",
    "image": "img/foguete-de-propulsao-termica.png",
    "freqNum": 1832
  },
  {
    "item": "Folhas",
    "freq": "9816",
    "image": "img/folhas-1.png",
    "freqNum": 9816
  },
  {
    "item": "Fragmentos de Alumínio",
    "freq": "1438",
    "image": "img/fragmentos-de-aluminio.png",
    "freqNum": 1438
  },
  {
    "item": "Galão de Ácido Nítrico",
    "freq": "5832",
    "image": "img/galao-de-acido-nitrico.png",
    "freqNum": 5832
  },
  {
    "item": "Galão de Ácido Sulfúrico",
    "freq": "7631",
    "image": "img/galao-de-acido-sulfurico.png",
    "freqNum": 7631
  },
  {
    "item": "Galão de Água",
    "freq": "2473",
    "image": "img/galao-de-agua.png",
    "freqNum": 2473
  },
  {
    "item": "Galão de Biocombustível Líquido",
    "freq": "2397",
    "image": "img/galao-de-biocombustivel-liquido.png",
    "freqNum": 2397
  },
  {
    "item": "Galão de Combustível",
    "freq": "6713",
    "image": "img/galao-de-combustivel.png",
    "freqNum": 6713
  },
  {
    "item": "Galão de Combustível de Foguete",
    "freq": "5719",
    "image": "img/galao-de-combustivel-de-foguete.png",
    "freqNum": 5719
  },
  {
    "item": "Galão de Combustível Ionizado",
    "freq": "9218",
    "image": "img/galao-de-combustivel-ionizado.png",
    "freqNum": 9218
  },
  {
    "item": "Galão de Solução de Alumina",
    "freq": "4297",
    "image": "img/galao-de-solucao-de-alumina.png",
    "freqNum": 4297
  },
  {
    "item": "Galão de Turbocombustível",
    "freq": "7631",
    "image": "img/galao-de-turbocombustivel.png",
    "freqNum": 7631
  },
  {
    "item": "Gás Nitrogênio",
    "freq": "4892",
    "image": "img/gas-nitrogenio.png",
    "freqNum": 4892
  },
  {
    "item": "Gerador de Campo Magnético",
    "freq": "4981",
    "image": "img/gerador-de-campo-magnetico.png",
    "freqNum": 4981
  },
  {
    "item": "Lesma Elétrica Amarela",
    "freq": "8157",
    "image": "img/lesma-eletrica-amarela.png",
    "freqNum": 8157
  },
  {
    "item": "Lesma Elétrica Azul",
    "freq": "6149",
    "image": "img/lesma-eletrica-azul.png",
    "freqNum": 6149
  },
  {
    "item": "Lesma Elétrica Roxa",
    "freq": "8916",
    "image": "img/lesma-eletrica-roxa.png",
    "freqNum": 8916
  },
  {
    "item": "Limitador da I.A.",
    "freq": "2319",
    "image": "img/limitador-da-i-a.png",
    "freqNum": 2319
  },
  {
    "item": "Lingote de Aço",
    "freq": "9123",
    "image": "img/lingote-de-aco.png",
    "freqNum": 9123
  },
  {
    "item": "Lingote de Alumínio",
    "freq": "8904",
    "image": "img/lingote-de-aluminio.png",
    "freqNum": 8904
  },
  {
    "item": "Lingote de Catério",
    "freq": "8042",
    "image": "img/lingote-de-caterio.png",
    "freqNum": 8042
  },
  {
    "item": "Lingote de Cobre",
    "freq": "9156",
    "image": "img/lingote-de-cobre.png",
    "freqNum": 9156
  },
  {
    "item": "Lingote de Ferro",
    "freq": "8903",
    "image": "img/lingote-de-ferro.png",
    "freqNum": 8903
  },
  {
    "item": "Lingote de Ficsita",
    "freq": "7328",
    "image": "img/lingote-de-ficsita.png",
    "freqNum": 7328
  },
  {
    "item": "Lixo de Plutônio",
    "freq": "5941",
    "image": "img/lixo-de-plutonio.png",
    "freqNum": 5941
  },
  {
    "item": "Lixo de Urânio",
    "freq": "2849 / 2848",
    "image": "img/lixo-de-uranio.png",
    "freqNum": 0
  },
  {
    "item": "Madeira",
    "freq": "5264",
    "image": "img/madeira-1.png",
    "freqNum": 5264
  },
  {
    "item": "MAE",
    "freq": "6197",
    "image": "img/mae-1.png",
    "freqNum": 6197
  },
  {
    "item": "MAE Reanimada",
    "freq": "4897",
    "image": "img/mae-reanimada.png",
    "freqNum": 4897
  },
  {
    "item": "Máscara de gás",
    "freq": "6766",
    "image": "img/mascara-de-gas.png",
    "freqNum": 6766
  },
  {
    "item": "Massa Nuclear",
    "freq": "8916",
    "image": "img/massa-nuclear.png",
    "freqNum": 8916
  },
  {
    "item": "Matéria Fotônica Energizada",
    "freq": "7392",
    "image": "img/materia-fotonica-energizada.png",
    "freqNum": 7392
  },
  {
    "item": "Matriz de Energia Alienígena",
    "freq": "6113",
    "image": "img/matriz-de-energia-alienigena.png",
    "freqNum": 6113
  },
  {
    "item": "Micélios",
    "freq": "3971",
    "image": "img/micelios.png",
    "freqNum": 3971
  },
  {
    "item": "Minério de Catério",
    "freq": "4986",
    "image": "img/minerio-de-caterio.png",
    "freqNum": 4986
  },
  {
    "item": "Minério de Cobre",
    "freq": "7135",
    "image": "img/minerio-de-cobre.png",
    "freqNum": 7135
  },
  {
    "item": "Minério de Ferro",
    "freq": "4378",
    "image": "img/minerio-de-ferro.png",
    "freqNum": 4378
  },
  {
    "item": "Motor",
    "freq": "1273",
    "image": "img/motor-1.png",
    "freqNum": 1273
  },
  {
    "item": "Motor de Dobra Balístico",
    "freq": "9832",
    "image": "img/motor-de-dobra-balistico.png",
    "freqNum": 9832
  },
  {
    "item": "Motor Modular",
    "freq": "7154",
    "image": "img/motor-modular.png",
    "freqNum": 7154
  },
  {
    "item": "Motor Turbo",
    "freq": "8147",
    "image": "img/motor-turbo.png",
    "freqNum": 8147
  },
  {
    "item": "Munição de Fuzil",
    "freq": "2784",
    "image": "img/municao-de-fuzil.png",
    "freqNum": 2784
  },
  {
    "item": "Munição de Fuzil Turbinado",
    "freq": "2784",
    "image": "img/municao-de-fuzil-turbinado.png",
    "freqNum": 2784
  },
  {
    "item": "Munição Guiada de Fuzil",
    "freq": "7314",
    "image": "img/municao-guiada-de-fuzil.png",
    "freqNum": 7314
  },
  {
    "item": "Nobelisco",
    "freq": "6847",
    "image": "img/nobelisco-1.png",
    "freqNum": 6847
  },
  {
    "item": "Nobelisco Atômico",
    "freq": "9834",
    "image": "img/nobelisco-atomico.png",
    "freqNum": 9834
  },
  {
    "item": "Nobelisco de Fragmentação",
    "freq": "4186",
    "image": "img/nobelisco-de-fragmentacao.png",
    "freqNum": 4186
  },
  {
    "item": "Nobelisco de Pulso",
    "freq": "7594",
    "image": "img/nobelisco-de-pulso.png",
    "freqNum": 7594
  },
  {
    "item": "Nobelisco Venenoso",
    "freq": "3968",
    "image": "img/nobelisco-venenoso.png",
    "freqNum": 3968
  },
  {
    "item": "Oscilador de Cristal",
    "freq": "9072",
    "image": "img/oscilador-de-cristal.png",
    "freqNum": 9072
  },
  {
    "item": "Oscilador de Superposição",
    "freq": "6432",
    "image": "img/oscilador-de-superposicao.png",
    "freqNum": 6432
  },
  {
    "item": "Parafuso",
    "freq": "1278",
    "image": "img/parafuso-1.png",
    "freqNum": 1278
  },
  {
    "item": "Pastilha de Plutônio",
    "freq": "2843",
    "image": "img/pastilha-de-plutonio.png",
    "freqNum": 2843
  },
  {
    "item": "Pétalas de Flores",
    "freq": "6519",
    "image": "img/petalas-de-flores.png",
    "freqNum": 6519
  },
  {
    "item": "Petróleo Bruto",
    "freq": "6842",
    "image": "img/petroleo-bruto.png",
    "freqNum": 6842
  },
  {
    "item": "Petróleo Envasado",
    "freq": "6521",
    "image": "img/petroleo-envasado.png",
    "freqNum": 6521
  },
  {
    "item": "Placa de Circuito",
    "freq": "1934",
    "image": "img/placa-de-circuito.png",
    "freqNum": 1934
  },
  {
    "item": "Plástico",
    "freq": "3621 / 3622 / 3623",
    "image": "img/plastico.png",
    "freqNum": 0
  },
  {
    "item": "Pó de Cobre",
    "freq": "1209",
    "image": "img/po-de-cobre.png",
    "freqNum": 1209
  },
  {
    "item": "Pólvora",
    "freq": "9625",
    "image": "img/polvora.png",
    "freqNum": 9625
  },
  {
    "item": "Pólvora Sem Fumaça",
    "freq": "9624",
    "image": "img/polvora-sem-fumaca.png",
    "freqNum": 9624
  },
  {
    "item": "Processador Neuroquântico",
    "freq": "9124",
    "image": "img/processador-neuroquantico.png",
    "freqNum": 9124
  },
  {
    "item": "Proteína Alienígena",
    "freq": "3628",
    "image": "img/proteina-alienigena.png",
    "freqNum": 3628
  },
  {
    "item": "Quartzo Bruto",
    "freq": "9732",
    "image": "img/quartzo-bruto.png",
    "freqNum": 9732
  },
  {
    "item": "Recipiente Vazio",
    "freq": "8053",
    "image": "img/recipiente-vazio.png",
    "freqNum": 8053
  },
  {
    "item": "Resíduo de Matéria Escura",
    "freq": "8402",
    "image": "img/residuo-de-materia-escura.png",
    "freqNum": 8402
  },
  {
    "item": "Resíduo Pesado de Petróleo",
    "freq": "3819",
    "image": "img/residuo-pesado-de-petroleo.png",
    "freqNum": 3819
  },
  {
    "item": "Resina de Polímero",
    "freq": "7629",
    "image": "img/resina-de-polimero.png",
    "freqNum": 7629
  },
  {
    "item": "Rotor",
    "freq": "1347",
    "image": "img/rotor-1.png",
    "freqNum": 1347
  },
  {
    "item": "Servidor de Expansão de IA",
    "freq": "7854",
    "image": "img/servidor-de-expansao-de-ia.png",
    "freqNum": 7854
  },
  {
    "item": "Sílica",
    "freq": "6548",
    "image": "img/silica.png",
    "freqNum": 6548
  },
  {
    "item": "Sinalizador",
    "freq": "9273",
    "image": "img/sinalizador-1.png",
    "freqNum": 9273
  },
  {
    "item": "Sistema de Refrigeração",
    "freq": "5837",
    "image": "img/sistema-de-refrigeracao.png",
    "freqNum": 5837
  },
  {
    "item": "Sistema Diretor de Montagem",
    "freq": "1745",
    "image": "img/sistema-diretor-de-montagem.png",
    "freqNum": 1745
  },
  {
    "item": "Solução de Alumina",
    "freq": "4297",
    "image": "img/solucao-de-alumina.png",
    "freqNum": 4297
  },
  {
    "item": "Solução de Sílica",
    "freq": "6479",
    "image": "img/solucao-de-silica.png",
    "freqNum": 6479
  },
  {
    "item": "Supercomputador",
    "freq": "8247",
    "image": "img/supercomputador-1.png",
    "freqNum": 8247
  },
  {
    "item": "Tanque de Fluidos Vazio",
    "freq": "6284",
    "image": "img/tanque-de-fluidos-vazio.png",
    "freqNum": 6284
  },
  {
    "item": "Tanque de Gás Nitrogênio",
    "freq": "4892",
    "image": "img/tanque-de-gas-nitrogenio.png",
    "freqNum": 4892
  },
  {
    "item": "Tecido",
    "freq": "4798",
    "image": "img/tecido-1.png",
    "freqNum": 4798
  },
  {
    "item": "Thoriuum",
    "freq": "3822",
    "image": "img/thorium-1.png",
    "freqNum": 3822
  },
  {
    "item": "Trígono de Ficsita",
    "freq": "2147",
    "image": "img/trigono-de-ficsita.png",
    "freqNum": 2147
  },
  {
    "item": "Tubulação de Aço",
    "freq": "2198",
    "image": "img/tubulacao-de-aco.png",
    "freqNum": 2198
  },
  {
    "item": "Turbocombustível",
    "freq": "7631",
    "image": "img/turbocombustivel.png",
    "freqNum": 7631
  },
  {
    "item": "Unidade de Controle Adaptativa",
    "freq": "4531",
    "image": "img/unidade-de-controle-adaptativa.png",
    "freqNum": 4531
  },
  {
    "item": "Unidade de Controle de Rádio",
    "freq": "8142",
    "image": "img/unidade-de-controle-de-radio.png",
    "freqNum": 8142
  },
  {
    "item": "Urânio",
    "freq": "9421",
    "image": "img/uranio.png",
    "freqNum": 9421
  },
  {
    "item": "Urânio Não Físsil",
    "freq": "6427",
    "image": "img/uranio-nao-fissil.png",
    "freqNum": 6427
  },
  {
    "item": "Vergalhão Atordoante",
    "freq": "1635",
    "image": "img/vergalhao-atordoante.png",
    "freqNum": 1635
  },
  {
    "item": "Vergalhão de Estilhaços",
    "freq": "5483",
    "image": "img/vergalhao-de-estilhacos.png",
    "freqNum": 5483
  },
  {
    "item": "Vergalhão de Ferro",
    "freq": "1048",
    "image": "img/vergalhao-de-ferro.png",
    "freqNum": 1048
  },
  {
    "item": "Vergalhão Explosivo",
    "freq": "8396",
    "image": "img/vergalhao-explosivo.png",
    "freqNum": 8396
  },
  {
    "item": "Viga de Aço",
    "freq": "6348",
    "image": "img/viga-de-aco.png",
    "freqNum": 6348
  },
  {
    "item": "Viga Industrial Revestida",
    "freq": "9317",
    "image": "img/viga-industrial-revestida.png",
    "freqNum": 9317
  }
];
