configGetLanguage = function() {
	return i18n.getLanguage();
}

var us_example = "beautiful, love, blessed, kind, guilty, free";
var br_example = "feliz, amor, linda, lindo, culpada, culpado";
var lang_en_US = {
	projectDescription : {
		title : 'How are you feeling?',
		text : '\
		<p> \
			<em>Me Sinto</em> visualizes people\'s feelings in real time, as they are \
			shared on Twitter. It is easy. \
			Just type in one or more feeling words and hit enter. You will see tweets \
			of people sharing similar feelings. \
		</p>',
		example : '\
		<p> \
			<a href="#" class="defaultFont" id="example" style="font-size:1em;"> \
			Example: ' + us_example + ' </a> \
		</p>',
		ex : us_example
	},
	language : "Mudar para português",
	appName : "Me Sinto",
	headlineQuestion : "How are you feeling?",
	searchBarPlaceholder : "I Feel",
	about : "About",
	background : {
		title : "Background",
		text : '\
			<p> \
				<em>Me Sinto</em> was based on the 2006 project <a href="http://www.number27.org/wefeelfine" target="_blank">We Feel Fine</a>, by <a href="http://www.number27.org/" target="_blank">Jonathas Harris</a>. Harris seizes the state of mind of people by searching the internet for feelings, specifically, blog posts with sentences starting with <em>I feel</em> and <em>I\'m felling</em>. <em>We Feel Fine</em> shows a number of carefully crafted infographics and beautiful image compositions. \
				<em>We Feel Fine</em> has also inspired other similar projects.\
			</p> \
			<p> \
				<em>Me Sinto</em> applies the same idea in the era of Twitter. The staggering number of users sharing their hearts on social media makes a project like this much faster to execute. Here we show what people feel in real-time. \
			</p>'
	},
	tutorial : {
		title : "What are those bars and circles?",
		text : '\
			<p>\
				To get started, you must type-in a word that the completes the sentence "I feel ...". We will show recent tweets of people describing similar feelings. Each circle is a tweet somebody recently tweeted. Click on them to see what they are about. The tweets fall into one of the bars and, from time to time, the circles are aggregated to the bar. When aggregation happens, the height of each bar changes. The higher the bar, the more tweets about that feeling. The shorter, less tweets. Each bar is associated with a word you typed-in. So if you type "Sad" and "Happy" you will see how many people feel happy and sad at that moment. You can also click on the twitter handle of a particular user to see their message on the Twitter website. \
			</p>'
	},
	developedBy : 'Developed by <a href="http://www.tiagoetiene.net" target="_blank">Tiago Etiene</a> | <a href="mailto:tiago.etiene@gmail.com">tiago.etiene@gmail.com</a>',
	builtWith : '\
		<p>\
			Built with <a href="www.meteor.com" target="_blank">Meteor</a> | <a href="visualsedimentation.org" target="_blank">Visual Sedimentation</a> | <a href="www.d3.org" target="_blank">D3</a> | <a href="https://github.com/tiagoetiene/chom" target="_blank">chom</a>\
		</p>',
	close : "Close",
	loading : "Loading tweets...",
	clear : "Clear Selection",
};
var lang_pt_BR = {
	projectDescription : {
		title : 'Como você se sente?',
		text : '\
		<p> \
			<em>Me Sinto</em> visualiza o sentimento que as pessoas expressam nas \
			redes sociais em tempo real. É bem simples. \
			Digite uma ou mais palavas que descrevem um sentimento e pressione enter. \
			Você verá tuítes de pessoas que compartilham sentimentos similares. \
		</p>',
		example : '\
		<p> \
			<a href="#" class="defaultFont" id="example" style="font-size:1em;"> \
			Exemplo: ' + br_example + ' </a> \
		</p>',
		ex : br_example
	},
	language : "Switch to english",
	appName : "Me Sinto",
	headlineQuestion : "Como você se sente?",
	searchBarPlaceholder : "Eu me sinto",
	about : "Sobre",
	background : {
		title : "História",
		text : '\
			<p> \
				<em>Me Sinto</em> é inspirado no projeto <a href="http://www.number27.org/wefeelfine" target="_blank">We Feel Fine</a>, por <a href="http://www.number27.org/" target="_blank">Jonathas Harris</a>. Harris captura o sentimento das pessoas procurando por textos e sentenças na web que contém as palavras <em>Eu me sinto</em> and <em>Eu estou sentindo</em>. <em>We Feel Fine</em> mostra vários infográfico - cuidadosamente construídos - e belas composições com fotos escolhidas por usuários. \
				<em>We Feel Fine</em> serve como fonto de inspiração para vários outros projetos. \
			</p> \
			<p> \
				<em>Me Sinto</em> applica a mesma idéia na era do Twitter. Hoje em dia, um número incrível de pessoas compartilham seus sentimentos nas redes sociais. Isso permite que projetos como esse sejam colocados em prática muito mais rapidamente. Aqui mostramos o que as pessoas sentem em tempo real. \
			</p>'
	},
	tutorial : {
		title : 'O que são essas barras e círculos?',
		text : '\
			<p>\
				Para começar, você digita uma palavra que complete a sentença "Eu me sinto ...". Em seguir, mostramos tweets de outras pessoas que descrevem sentimentos similares aos seus. Cada círculo é um tweet que alguém em algum lugar tuítou. Clique neles para ver o que eles dizem. Os tweets caem em cima de barras e, de tempos em tempos, eles são agregados à barra. Quando isso acontece, a altura da barra muda. Quanto mais alta a barra, mais tweets a respeito daquele sentimento. Cada barra está associada com umas das palavras digitadas. Sendo assim, se você digitar "Triste" e "Feliz", você verá quantas pessoas se sentem felizes e tristes naquele mommento. Você também pode clicar no nome do usuário para ver o autor do tweet no site do Twitter. \
			</p>'
	},
	developedBy : 'Desenvolvido por <a href="http://www.tiagoetiene.net" target="_blank">Tiago Etiene</a> | <a href="mailto:tiago.etiene@gmail.com">tiago.etiene@gmail.com</a>',
	builtWith : 'Construído usando <a href="www.meteor.com" target="_blank">Meteor</a> | <a href="visualsedimentation.org" target="_blank">Visual Sedimentation</a> | <a href="www.d3.org" target="_blank">D3</a> | <a href="https://github.com/tiagoetiene/chom" target="_blank">chom</a>',
	close : "Fechar",
	loading : "Carregando tuítes",
	clear : "Limpar busca",
};

var currentLanguage;
configInternationalization = function() {

	i18n.map('en-us', lang_en_US);
	i18n.map('en', lang_en_US);
	i18n.map('pt', lang_pt_BR);
	i18n.map('pt-br', lang_pt_BR);
	i18n.map('pt_br', lang_pt_BR);
	i18n.map('pt_BR', lang_pt_BR);

	currentLanguage = navigator.language.toLowerCase()
	i18n.setLanguage( currentLanguage );
	// i18n.setLanguage('pt-br');
	// i18n.setDefaultLanguage('en_US');
	i18n.showMissing('[no translation for "<%= label %>" in <%= language %>]');
}

switchLanguage = function() {
	if( _.isEqual( currentLanguage, "en" ) || _.isEqual( currentLanguage, "en-us" ) ) {
		currentLanguage = "pt";
		i18n.setLanguage( currentLanguage );
	} else {
		currentLanguage = "en";
		i18n.setLanguage( currentLanguage );
	}
}
