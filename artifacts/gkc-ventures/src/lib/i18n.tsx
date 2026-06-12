import React, { createContext, useContext, useState } from "react";

export type LangCode = "en" | "fr" | "ha" | "yo" | "ig";
const LANG_KEY = "gkc_lang";

export interface T {
  nav: {
    home: string; inventory: string; services: string; about: string;
    contact: string; viewCatalog: string; language: string;
  };
  hero: {
    badge: string; line1: string; line2: string; line3: string; line4: string;
    sub: string; cta1: string; cta2: string;
  };
  stats: { units: string; trucks: string; mining: string; drilling: string; };
  featured: { label: string; heading: string; sub: string; viewAll: string; empty: string; error: string; };
  categories: {
    heading: string; sub: string;
    trucks: string; trucksDesc: string;
    mining: string; miningDesc: string;
    drilling: string; drillingDesc: string;
    browse: string;
  };
  why: {
    heading1: string; heading2: string; sub: string;
    v1: string; v1d: string; v2: string; v2d: string;
    v3: string; v3d: string; v4: string; v4d: string;
  };
  cta: { heading: string; sub: string; btn1: string; btn2: string; };
  products: {
    pageTitle: string; pageSub: string;
    all: string; trucks: string; mining: string; drilling: string;
    inStock: string; search: string;
    sortName: string; sortAsc: string; sortDesc: string;
    showing: string; results: string;
    noResults: string; noResultsDesc: string; reset: string;
    error: string; errorDesc: string; retry: string;
  };
  footer: {
    tagline: string; navTitle: string; navHome: string; navInventory: string;
    navServices: string; navAbout: string; navContact: string;
    equipTitle: string; equipTrucks: string; equipMining: string;
    equipDrilling: string; equipFeatured: string;
    hqTitle: string; privacy: string; terms: string;
  };
  common: { inStock: string; outOfStock: string; featured: string; new_: string; used: string; refurbished: string; };
}

const en: T = {
  nav: { home: "Home", inventory: "Inventory", services: "Services", about: "About Us", contact: "Contact", viewCatalog: "View Catalog", language: "Language" },
  hero: { badge: "Garkuwan Kanam & Co Ventures", line1: "Built for", line2: "Scale.", line3: "Driven by", line4: "Power.", sub: "Nigeria's premier gateway to world-class heavy machinery. From deep-well drilling to large-scale mining operations, we deliver the force that builds nations.", cta1: "Explore Inventory", cta2: "Chat with Sales" },
  stats: { units: "Units in Stock", trucks: "Heavy Trucks", mining: "Mining Units", drilling: "Drilling Systems" },
  featured: { label: "Curated Selection", heading: "Featured Stock", sub: "Premium machinery, inspected and ready for immediate deployment to your site.", viewAll: "Full Inventory", empty: "No featured items available right now. Browse our full catalog.", error: "Could not load featured products. Please try again." },
  categories: { heading: "Browse by Category", sub: "Find the right equipment for your operation", trucks: "Heavy Trucks", trucksDesc: "Long-haul cargo, tippers & tractor units for road transport", mining: "Mining Trucks", miningDesc: "Giant-scale haul trucks & crawler dozers for mining operations", drilling: "Drilling Motors", drillingDesc: "Downhole mud motors & directional drilling systems", browse: "Browse All" },
  why: { heading1: "The Trusted", heading2: "Industrial Partner", sub: "Garkuwan Kanam & Co Ventures isn't just a supplier. We are an industrial force providing verified, heavy-duty machinery for the most demanding environments on the continent.", v1: "Verified Stock", v1d: "Every unit undergoes a 150-point industrial inspection before listing.", v2: "High Efficiency", v2d: "Optimized machinery designed for maximum uptime and output.", v3: "Certified Brands", v3d: "Direct partnerships with Caterpillar, FAW, and Mercedes-Benz.", v4: "Regional Reach", v4d: "Full logistics support across all 36 states in Nigeria and beyond." },
  cta: { heading: "Ready to Power Your Operation?", sub: "Consult with our industrial experts today. We provide full technical documentation and logistical support for every acquisition.", btn1: "WhatsApp Sales", btn2: "Request a Quote" },
  products: { pageTitle: "Industrial Catalog", pageSub: "Every unit in our inventory is industry-certified and field-ready. Filter by category or use the search tool to find specific models.", all: "All Equipment", trucks: "Trucks", mining: "Mining Trucks", drilling: "Drilling Motors", inStock: "In Stock Only", search: "Search models...", sortName: "Sort: Name", sortAsc: "Price: Low–High", sortDesc: "Price: High–Low", showing: "Showing", results: "results", noResults: "No Equipment Matches", noResultsDesc: "Try adjusting your filters or search terms.", reset: "Reset Filters", error: "Failed to Load Inventory", errorDesc: "We couldn't fetch the equipment list. Please check your connection and try again.", retry: "Retry" },
  footer: { tagline: "Nigeria's premier force in heavy machinery and industrial equipment. We bridge the gap between global engineering excellence and local industrial needs.", navTitle: "Navigation", navHome: "Home", navInventory: "Inventory Catalog", navServices: "Maintenance & Parts", navAbout: "Company Profile", navContact: "Get in Touch", equipTitle: "Equipment", equipTrucks: "Heavy Trucks", equipMining: "Mining Solutions", equipDrilling: "Drilling Systems", equipFeatured: "Featured Stock", hqTitle: "Headquarters", privacy: "Privacy Policy", terms: "Terms of Service" },
  common: { inStock: "In Stock", outOfStock: "Out of Stock", featured: "Featured", new_: "New", used: "Used", refurbished: "Refurbished" },
};

const fr: T = {
  nav: { home: "Accueil", inventory: "Inventaire", services: "Services", about: "À Propos", contact: "Contact", viewCatalog: "Voir le Catalogue", language: "Langue" },
  hero: { badge: "Garkuwan Kanam & Co Ventures", line1: "Construit pour", line2: "L'Échelle.", line3: "Propulsé par", line4: "La Puissance.", sub: "La principale passerelle du Nigeria vers les machines lourdes de classe mondiale. Du forage en profondeur aux grandes opérations minières, nous livrons la force qui bâtit les nations.", cta1: "Voir l'Inventaire", cta2: "Contacter les Ventes" },
  stats: { units: "Unités en Stock", trucks: "Camions Lourds", mining: "Unités Minières", drilling: "Systèmes de Forage" },
  featured: { label: "Sélection Curatée", heading: "Stock en Vedette", sub: "Machines de qualité, inspectées et prêtes pour un déploiement immédiat.", viewAll: "Inventaire Complet", empty: "Aucun article en vedette pour l'instant. Parcourez notre catalogue complet.", error: "Impossible de charger les produits en vedette. Veuillez réessayer." },
  categories: { heading: "Parcourir par Catégorie", sub: "Trouvez l'équipement adapté à votre opération", trucks: "Camions Lourds", trucksDesc: "Transport longue distance, bennes & tracteurs routiers", mining: "Camions Miniers", miningDesc: "Camions de transport géants & bouteurs à chenilles", drilling: "Moteurs de Forage", drillingDesc: "Moteurs de fond de trou & systèmes de forage directionnel", browse: "Tout Parcourir" },
  why: { heading1: "Le Partenaire", heading2: "Industriel de Confiance", sub: "Garkuwan Kanam & Co Ventures n'est pas qu'un fournisseur. Nous sommes une force industrielle fournissant des machines lourdes vérifiées pour les environnements les plus exigeants.", v1: "Stock Vérifié", v1d: "Chaque unité subit une inspection industrielle de 150 points avant inscription.", v2: "Haute Efficacité", v2d: "Machines optimisées pour un temps de fonctionnement et une production maximaux.", v3: "Marques Certifiées", v3d: "Partenariats directs avec Caterpillar, FAW et Mercedes-Benz.", v4: "Portée Régionale", v4d: "Soutien logistique complet dans les 36 États du Nigeria et au-delà." },
  cta: { heading: "Prêt à Propulser Votre Opération?", sub: "Consultez nos experts industriels dès aujourd'hui. Nous fournissons une documentation technique complète pour chaque acquisition.", btn1: "WhatsApp Ventes", btn2: "Demander un Devis" },
  products: { pageTitle: "Catalogue Industriel", pageSub: "Chaque unité de notre inventaire est certifiée et prête pour le terrain.", all: "Tout l'Équipement", trucks: "Camions", mining: "Camions Miniers", drilling: "Moteurs de Forage", inStock: "En Stock Seulement", search: "Rechercher modèles...", sortName: "Trier: Nom", sortAsc: "Prix: Croissant", sortDesc: "Prix: Décroissant", showing: "Affichage de", results: "résultats", noResults: "Aucun Équipement Trouvé", noResultsDesc: "Essayez d'ajuster vos filtres ou termes de recherche.", reset: "Réinitialiser", error: "Échec du Chargement", errorDesc: "Impossible de récupérer la liste. Vérifiez votre connexion.", retry: "Réessayer" },
  footer: { tagline: "La principale force du Nigeria en machines lourdes et équipements industriels. Nous comblons l'écart entre l'excellence technique mondiale et les besoins industriels locaux.", navTitle: "Navigation", navHome: "Accueil", navInventory: "Catalogue", navServices: "Maintenance", navAbout: "Profil", navContact: "Contact", equipTitle: "Équipement", equipTrucks: "Camions Lourds", equipMining: "Solutions Minières", equipDrilling: "Systèmes de Forage", equipFeatured: "Stock en Vedette", hqTitle: "Siège Social", privacy: "Politique de Confidentialité", terms: "Conditions d'Utilisation" },
  common: { inStock: "En Stock", outOfStock: "Rupture de Stock", featured: "En Vedette", new_: "Neuf", used: "Occasion", refurbished: "Reconditionné" },
};

const ha: T = {
  nav: { home: "Gida", inventory: "Kasuwa", services: "Ayyuka", about: "Game da Mu", contact: "Tuntuɓe", viewCatalog: "Duba Kasuwa", language: "Harshe" },
  hero: { badge: "Garkuwan Kanam & Co Ventures", line1: "An Gina don", line2: "Girman Aiki.", line3: "Ana Tuka ta", line4: "Ƙarfi.", sub: "Babbar hanyar Najeriya zuwa na'urori na duniya. Daga hakar rijiya zuwa manyan ayyukan hakar ma'adinai, muna kawo karfi wanda ke gina al'ummomi.", cta1: "Bincika Kasuwa", cta2: "Tuntubi Tallace-tallace" },
  stats: { units: "Na'urorin a Hannu", trucks: "Manyan Motoci", mining: "Na'urorin Hakar", drilling: "Tsarin Hakowa" },
  featured: { label: "Zaɓaɓɓun Kayan Aiki", heading: "Shahararrun Kayan Aiki", sub: "Na'urorin inganci, an bincika kuma sun shirya don amfani.", viewAll: "Dukan Kasuwa", empty: "Babu shahararrun abubuwa a yanzu. Nemi dukan katulogu.", error: "Kuskuren loda abubuwan da aka zaɓa. Don Allah sake gwadawa." },
  categories: { heading: "Nemi ta Nau'i", sub: "Sami kayan aiki da ya dace da aikinku", trucks: "Manyan Motoci", trucksDesc: "Jigilar kaya mai nisa, jigila & jan dabarun hanya", mining: "Motocin Hakar Ma'adinai", miningDesc: "Manyan motocin jigila & na'urorin tono ƙasa", drilling: "Injunan Hakowa", drillingDesc: "Injunan hakowa na ƙarƙashin ƙasa & tsarin ja-gora", browse: "Duba Duka" },
  why: { heading1: "Abokin Aiki", heading2: "Mai Aminci na Masana'antu", sub: "Garkuwan Kanam & Co Ventures ba kawai mai siyarwa ba ne. Muna samar da na'urorin masana'antu masu inganci.", v1: "Kayan Aiki Tabbatacce", v1d: "Kowace na'ura tana wucewa ta bita mai tsinkaye kafin shiga kasuwa.", v2: "Babbar Inganci", v2d: "Na'urorin da aka inganta don yin aiki na kayan aiki.", v3: "Alamun Kasuwanci Tabbatattu", v3d: "Haɗin gwiwa kai tsaye tare da Caterpillar, FAW, da Mercedes-Benz.", v4: "Isa Yankin Gida", v4d: "Cikakken goyon bayan kayan aiki a jihohi 36 na Najeriya da bayan haka." },
  cta: { heading: "Shirye don Ƙarfafa Aikinku?", sub: "Tuntubi ƙwararrunmu a masana'antu yau. Muna ba da cikakken taimakon fasaha.", btn1: "WhatsApp Tallace-tallace", btn2: "Nemi Farashin" },
  products: { pageTitle: "Katulogu na Masana'antu", pageSub: "Kowace na'ura a cikin kasuwarmu tana da takaddun shaida kuma a shirye take.", all: "Dukan Kayan Aiki", trucks: "Motoci", mining: "Motocin Hakar", drilling: "Injunan Hakowa", inStock: "A Hannun Kasuwa Kawai", search: "Nemi samfurin...", sortName: "Tsari: Suna", sortAsc: "Farashin: Ƙarami zuwa Babba", sortDesc: "Farashin: Babba zuwa Ƙarami", showing: "Ana nuna", results: "sakamako", noResults: "Babu Kayan Aiki da Ya Dace", noResultsDesc: "Gwada canza tace ko kalmomin bincike.", reset: "Sake Saita", error: "Kuskuren Lodawa", errorDesc: "Ba mu iya loda jerin kayan aiki ba.", retry: "Sake Gwadawa" },
  footer: { tagline: "Babbar ƙarfin Najeriya a cikin na'urorin masana'antu masu nauyi.", navTitle: "Kewayawa", navHome: "Gida", navInventory: "Katulogu Kasuwa", navServices: "Kula da Kayan Aiki", navAbout: "Bayanan Kamfani", navContact: "Tuntuɓi", equipTitle: "Kayan Aiki", equipTrucks: "Manyan Motoci", equipMining: "Maganin Hakar Ma'adinai", equipDrilling: "Tsarin Hakowa", equipFeatured: "Shahararrun Kayan Aiki", hqTitle: "Hedikwata", privacy: "Manufofin Sirri", terms: "Sharuɗɗan Amfani" },
  common: { inStock: "A Hannun Kasuwa", outOfStock: "Karancin Kayan", featured: "Shahararru", new_: "Sabo", used: "An Yi Amfani", refurbished: "An Gyara" },
};

const yo: T = {
  nav: { home: "Ilé", inventory: "Àkójọ", services: "Iṣẹ́", about: "Nípa Wa", contact: "Kàn Sí Wa", viewCatalog: "Wo Àkójọ", language: "Èdè" },
  hero: { badge: "Garkuwan Kanam & Co Ventures", line1: "A Kọ fún", line2: "Ìgbòkègbodò.", line3: "Ìdarí pẹ̀lú", line4: "Agbára.", sub: "Ẹnu-ọnà àkọ́kọ́ Nàìjíríà sí àwọn ẹ̀rọ líle tó dára jù lọ. Láti lílo jinlẹ̀ títí dé iṣẹ́ iwakùsà ńlá, a pèsè agbára tó ń kọ orílẹ̀-èdè.", cta1: "Ṣàwárí Àkójọ", cta2: "Bá Tàtà Sọ̀rọ̀" },
  stats: { units: "Ẹ̀rọ tó Wà", trucks: "Ọkọ̀ Ìrúkèrú", mining: "Ẹ̀rọ Iwakùsà", drilling: "Ẹ̀rọ Lílo" },
  featured: { label: "Àṣàyàn Pàtàkì", heading: "Àwọn Ẹ̀rọ Olókìkí", sub: "Àwọn ẹ̀rọ àgbàyanu, a ti ṣàyẹ̀wò wọn tán, ó sì ṣetán fún lílo.", viewAll: "Àkójọ Pípé", empty: "Kò sí àwọn ohun tó gbajúgbajà fún báyìí. Ṣàwárí àkójọ wa pípé.", error: "A kò lè gba àwọn ẹ̀rọ olókìkí. Jọ̀wọ́ gbìyànjú lẹ̀ẹ̀kan si." },
  categories: { heading: "Wá pẹ̀lú Ẹ̀ka", sub: "Rí ẹ̀rọ tó yẹ fún iṣẹ́ rẹ", trucks: "Àwọn Ọkọ̀ Líle", trucksDesc: "Gbigbe ẹrù jíjìn, tipper & àwọn ọkọ̀ tractor", mining: "Ọkọ̀ Iwakùsà", miningDesc: "Àwọn ọkọ̀ gbigbe ńlá & crawler dozers", drilling: "Ẹ̀rọ Lílo", drillingDesc: "Àwọn ẹ̀rọ lílo isalẹ̀ ilẹ̀ & ìdarí", browse: "Wò Gbogbo Rẹ̀" },
  why: { heading1: "Alábàáṣepọ̀", heading2: "Ilé-iṣẹ́ Tí a Gbẹ́kẹ̀lé", sub: "Garkuwan Kanam & Co Ventures kìí ṣe alatuta nìkan. A jẹ́ ipa ilé-iṣẹ́ tó n pèsè àwọn ẹ̀rọ líle tó tọ́.", v1: "Ẹ̀rọ Tó Jẹ́ Ìmúdájú", v1d: "Gbogbo ẹ̀rọ n kọjá àyẹ̀wò àwọn ojú-ibi 150 ṣáájú ìkànsí.", v2: "Ṣiṣẹ́ Gíga", v2d: "Àwọn ẹ̀rọ tó jẹ́ àmúdára fún àkókò ṣiṣẹ́ àti ìmúpọ̀ tó pọ̀ jù.", v3: "Àwọn Àmì Tó Jẹ́ Ìfọwọ́sí", v3d: "Àjọṣepọ̀ tààrà pẹ̀lú Caterpillar, FAW, àti Mercedes-Benz.", v4: "Ìdànù Ẹkùn-Ìpínlẹ̀", v4d: "Àtìlẹ́yìn ìrìn-àjò pípé ní àwọn ìpínlẹ̀ 36 Nàìjíríà." },
  cta: { heading: "Ṣetán láti Fún Iṣẹ́ Rẹ Ní Agbára?", sub: "Jẹ́ kí àwọn onímọ̀ wa ṣe ìlànà fún ọ lónìí. A pèsè àkọsílẹ̀ ìmọ̀-ẹrọ pípé.", btn1: "WhatsApp Tàtà", btn2: "Béèrè Iye Owó" },
  products: { pageTitle: "Àkójọ Ilé-iṣẹ́", pageSub: "Gbogbo ẹ̀rọ nínú àkójọ wa jẹ́ ìfọwọ́sí ìgbẹ̀kẹ̀lé.", all: "Gbogbo Ẹ̀rọ", trucks: "Ọkọ̀", mining: "Ọkọ̀ Iwakùsà", drilling: "Ẹ̀rọ Lílo", inStock: "Tó Wà Nìkan", search: "Wá àwọn àpẹẹrẹ...", sortName: "Tò: Orúkọ", sortAsc: "Iye: Kékeré–Ńlá", sortDesc: "Iye: Ńlá–Kékeré", showing: "Ìfihàn", results: "àbájáde", noResults: "Kò Sí Ẹ̀rọ Tó Bá", noResultsDesc: "Gbìyànjú ìyípadà àwọn àlẹ̀mọ́ rẹ.", reset: "Tún Àlẹ̀mọ́ Ṣe", error: "Àṣìṣe Níwọ̀n", errorDesc: "A kò lè gba àkójọ ẹ̀rọ.", retry: "Gbìyànjú Lẹ́ẹ̀kan Síi" },
  footer: { tagline: "Ipa àkọ́kọ́ Nàìjíríà nínú àwọn ẹ̀rọ líle àti ohun èlò ilé-iṣẹ́.", navTitle: "Ìlọsíwájú", navHome: "Ilé", navInventory: "Àkójọ", navServices: "Ìtọ́jú", navAbout: "Pírófáìlì", navContact: "Kàn Sí", equipTitle: "Ẹ̀rọ", equipTrucks: "Àwọn Ọkọ̀ Líle", equipMining: "Àwọn Ọkọ̀ Iwakùsà", equipDrilling: "Àwọn Ẹ̀rọ Lílo", equipFeatured: "Àwọn Ẹ̀rọ Olókìkí", hqTitle: "Àkọ́lé Àárọ̀", privacy: "Ìlànà Àṣírí", terms: "Àwọn Ìpinnu Lílo" },
  common: { inStock: "Tó Wà", outOfStock: "Tán", featured: "Olókìkí", new_: "Tuntun", used: "Ìlò", refurbished: "Tó Jẹ́ Ìtúnsẹ̀" },
};

const ig: T = {
  nav: { home: "Ụlọ", inventory: "Ndepụta", services: "Ọrụ", about: "Maka Anyị", contact: "Kpọtụ Anyị", viewCatalog: "Lee Ndepụta", language: "Asụsụ" },
  hero: { badge: "Garkuwan Kanam & Co Ventures", line1: "Ewuru maka", line2: "Nnukwu Ọrụ.", line3: "Ọ na-agba ọsọ site na", line4: "Ike.", sub: "Ụzọ mbụ nke Naịjirịa gaa n'igwe dị arọ ndị ụwa. Site na wiwe olulu ojii ruo nnukwu ọrụ ngwuputa, anyị na-ewepụta ike wulite mba.", cta1: "Chọọ Ndepụta", cta2: "Kparịta ná Nzọụkwụ" },
  stats: { units: "Igwe dị n'ọnọdụ", trucks: "Ụgbọ Ibu Dị Arọ", mining: "Igwe Ngwuputa", drilling: "Ngwa Wiwe" },
  featured: { label: "Nhọrọ Pụtara Ìhè", heading: "Ngwa Ọ Pụtara Ìhè", sub: "Igwe dị mma, enyere aka wee dị njikere maka eji ozugbo.", viewAll: "Ndepụta Nile", empty: "Ọ dịghị ihe pụtara ìhè ugbu a. Chọọ katalogu anyị nile.", error: "Enweghị ike ibuata ngwaahịa pụtara ìhè. Biko nwaa ọzọ." },
  categories: { heading: "Chọọ site n'Udi", sub: "Chọọ ngwa kwesịrị ekwesị maka ọrụ gị", trucks: "Ụgbọ Ibu Dị Arọ", trucksDesc: "Ịnyefe ibu ije anya, tipper & ụgbọ ụzọ", mining: "Ụgbọ Ngwuputa", miningDesc: "Nnukwu ụgbọ ibu & crawler dozers", drilling: "Igwe Wiwe", drillingDesc: "Igwe wiwe n'ime ala & nduzi", browse: "Lee Nile" },
  why: { heading1: "Onye Mmekọ", heading2: "Ụlọ Ọrụ A Tụkwasịrị Obi", sub: "Garkuwan Kanam & Co Ventures abụghị naanị onye na-ere ahịa. Anyị bụ ike ụlọ ọrụ na-enye igwe dị arọ emeziri emezi.", v1: "Ngwa Emeziri", v1d: "Ọ bụla igwe na-agafeghachi ule isi 150 tupu ịbanye ahịa.", v2: "Arụmọrụ Dị Elu", v2d: "Igwe emeziri maka oge ọrụ kacha elu na mmepụta.", v3: "Akara Amara Ekwenyere", v3d: "Mmekọ ozugbo na Caterpillar, FAW, na Mercedes-Benz.", v4: "Iru Mpaghara", v4d: "Nkwado ọrụ zuru ezu na steeti 36 Naịjirịa." },
  cta: { heading: "Dị Njikere Ịkwado Ọrụ Gị?", sub: "Kparịta na ndị ọkachamara anyị taa. Anyị na-enye akwụkwọ ụzọ ọrụ zuru ezu.", btn1: "WhatsApp Nzọụkwụ", btn2: "Rịọ Ọnụahịa" },
  products: { pageTitle: "Katalọgu Ụlọ Ọrụ", pageSub: "Ọ bụla igwe n'ndepụta anyị nwere asambodo.", all: "Ngwa Nile", trucks: "Ụgbọ", mining: "Ụgbọ Ngwuputa", drilling: "Igwe Wiwe", inStock: "Ndị Dị Naanị", search: "Chọọ ụdị...", sortName: "Nhazi: Aha", sortAsc: "Ọnụahịa: Ala–Elu", sortDesc: "Ọnụahịa: Elu–Ala", showing: "Na-egosi", results: "nsonaazụ", noResults: "Ọ Dịghị Ngwa Dabara", noResultsDesc: "Nwaa ịgbanwe nzacha gị.", reset: "Weghachite Nzacha", error: "Ọ Dịghị Ike Ibuata", errorDesc: "Anyị enweghị ike ịnweta ndepụta ngwa.", retry: "Nwaa Ọzọ" },
  footer: { tagline: "Ike mbụ Naịjirịa n'igwe dị arọ na ngwa ụlọ ọrụ.", navTitle: "Nchọgharị", navHome: "Ụlọ", navInventory: "Katalọgu", navServices: "Nlekọta", navAbout: "Profaịlụ", navContact: "Kpọtụ", equipTitle: "Ngwa", equipTrucks: "Ụgbọ Ibu Dị Arọ", equipMining: "Ngwa Ngwuputa", equipDrilling: "Ụzọ Wiwe", equipFeatured: "Ngwa Pụtara Ìhè", hqTitle: "Isi Ụlọ Ọrụ", privacy: "Iwu Nzuzo", terms: "Ọnọdụ Ojiji" },
  common: { inStock: "Dị n'Ọnọdụ", outOfStock: "Afọ Efu", featured: "Pụtara Ìhè", new_: "Ọhụrụ", used: "Eji", refurbished: "Ezigharịrị" },
};

const translations: Record<LangCode, T> = { en, fr, ha, yo, ig };

interface LangCtx { lang: LangCode; setLang: (l: LangCode) => void; t: T; }
const LanguageContext = createContext<LangCtx>({ lang: "en", setLang: () => {}, t: en });

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const stored = typeof localStorage !== "undefined" ? (localStorage.getItem(LANG_KEY) as LangCode | null) : null;
  const valid: LangCode[] = ["en", "fr", "ha", "yo", "ig"];
  const initial: LangCode = stored && valid.includes(stored as LangCode) ? (stored as LangCode) : "en";
  const [lang, setLangState] = useState<LangCode>(initial);
  const setLang = (l: LangCode) => { setLangState(l); localStorage.setItem(LANG_KEY, l); };
  return <LanguageContext.Provider value={{ lang, setLang, t: translations[lang] }}>{children}</LanguageContext.Provider>;
}

export function useLanguage() { return useContext(LanguageContext); }

export const LANGUAGES: { code: LangCode; nativeName: string; flag: string }[] = [
  { code: "en", nativeName: "English", flag: "🇬🇧" },
  { code: "fr", nativeName: "Français", flag: "🇫🇷" },
  { code: "ha", nativeName: "Hausa", flag: "🇳🇬" },
  { code: "yo", nativeName: "Yorùbá", flag: "🇳🇬" },
  { code: "ig", nativeName: "Igbo", flag: "🇳🇬" },
];
