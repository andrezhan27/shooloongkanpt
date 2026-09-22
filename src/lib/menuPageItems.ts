export type MenuDishCategory =
  | "premium"
  | "seafood"
  | "meat"
  | "vegetables"
  | "noodles"
  | "snacks"
  | "desserts";

export type MenuDish = {
  image: string;
  category: MenuDishCategory;
  name: {
    pt: string;
    en: string;
  };
};

// Edit dish names here. The order below is also the order used on the menu page,
// with premium and visually distinctive dishes intentionally shown first.
export const menuPageItems: MenuDish[] = [
  { image: "DSC02534 copiar.webp", category: "meat", name: { pt: "Wagyu A5", en: "A5 Wagyu" } },
  { image: "DSC02530 copiar.webp", category: "meat", name: { pt: "Lombo de Angus", en: "Angus Sirloin" } },
  { image: "DSC02301 copiar.webp", category: "seafood", name: { pt: "Combo de Marisco", en: "Seafood Platter" } },
  { image: "DSC02367 copiar.webp", category: "seafood", name: { pt: "Camarão Black Tigre", en: "Black Tiger Prawns" } },
  { image: "DSC02467 copiar.webp", category: "seafood", name: { pt: "Garra de Caranguejo", en: "Crab Claws" } },
  { image: "DSC02497 copiar.webp", category: "seafood", name: { pt: "Gambão", en: "King Prawns" } },
  { image: "DSC02462 copiar.webp", category: "meat", name: { pt: "Costele", en: "Lamb Chops" } },
  { image: "DSC02524 copiar.webp", category: "meat", name: { pt: "Combo de Vaca", en: "Premium Beef Platter" } },
  { image: "DSC02321 copiar.webp", category: "seafood", name: { pt: "Chocos", en: "Cuttlefish" } },
  { image: "DSC02577 copiar.webp", category: "meat", name: { pt: "Pernas de Rã", en: "Frog Legs" } },
  { image: "DSC02551 copiar.webp", category: "meat", name: { pt: "Fatias de Carne Angus", en: "Sliced Angus Beef" } },
  { image: "DSC02561 copiar.webp", category: "meat", name: { pt: "Fatias de Novilho", en: "Sliced Beef" } },
  { image: "DSC02517 copiar.webp", category: "meat", name: { pt: "Fatias de Cordeiro", en: "Sliced Lamb" } },
  { image: "DSC02334 copiar.webp", category: "seafood", name: { pt: "Fatias de Corvina", en: "Sliced Croaker" } },
  { image: "DSC02574 copiar.webp", category: "meat", name: { pt: "Língua de Novilho", en: "Beef Tongue" } },
  // { image: "DSC02381 copiar.webp", category: "meat", name: { pt: "Fatias de Entremeada", en: "Sliced Pork Belly" } },
  { image: "DSC02553 copiar.webp", category: "meat", name: { pt: "Fatias de Entremeada", en: "Sliced Pork Belly" } },
  { image: "DSC02377 copiar.webp", category: "seafood", name: { pt: "Pasta de Camarão", en: "Prawn Paste" } },
  { image: "DSC02588 copiar.webp", category: "seafood", name: { pt: "Carne de Fiambre", en: "Spam" } },
  { image: "DSC02594 copiar.webp", category: "meat", name: { pt: "Almôndegas de Novilho", en: "Beef Meatballs" } },
  { image: "DSC02490 copiar.webp", category: "snacks", name: { pt: "Dumplings de Camarão", en: "Prawn Dumplings" } },
  { image: "DSC02501 copiar.webp", category: "snacks", name: { pt: "Pato à Pequim", en: "Peking Duck" } },
  { image: "DSC02455 copiar.webp", category: "snacks", name: { pt: "Dim Sum de Qingtian", en: "Qingtian Dim Sum" } },
  { image: "DSC02439 copiar.webp", category: "snacks", name: { pt: "Gyozas Fritas", en: "Fried Gyoza" } },
  { image: "DSC02417 copiar.webp", category: "snacks", name: { pt: "Tempura de Camarão", en: "Prawn Tempura" } },
  { image: "DSC02396 copiar.webp", category: "snacks", name: { pt: "Pão Chinês", en: "Chinese Buns" } },
  // { image: "DSC02289 copiar.webp", category: "snacks", name: { pt: "Salada de Pepino", en: "Cucumber Salad" } },
  { image: "DSC02306 copiar.webp", category: "meat", name: { pt: "Moela de Pato", en: "Duck Gizzard" } },
  { image: "DSC02319 copiar.webp", category: "meat", name: { pt: "Fígado de Vaca", en: "Beef Liver" } },
  { image: "DSC02331 copiar.webp", category: "meat", name: { pt: "Dobrada", en: "Beef Tripe" } },
  { image: "DSC02342 copiar.webp", category: "meat", name: { pt: "Intestino de Ganso", en: "Goose Intestine" } },
  // { image: "DSC02350 copiar.webp", category: "meat", name: { pt: "Entrecosto de Porco Picante", en: "Spicy Pork Ribs" } },
  { image: "DSC02402 copiar.webp", category: "meat", name: { pt: "Miolo de Porco", en: "Pig Brain" } },
  { image: "DSC02425 copiar.webp", category: "snacks", name: { pt: "Novilho Marinado com Molho de Soja", en: "Soy-marinated Beef" } },
  { image: "DSC02510 copiar.webp", category: "seafood", name: { pt: "Lulas", en: "Squid" } },
  { image: "DSC02599 copiar.webp", category: "snacks", name: { pt: "Tiras de Carne Crocantes", en: "Crispy Beef Strips" } },
  { image: "DSC02604 copiar.webp", category: "snacks", name: { pt: "Crepes Chineses", en: "Chinese Spring Rolls" } },
  { image: "DSC02613 copiar.webp", category: "noodles", name: { pt: "Massa Fina Salteada", en: "Stir-fried Thin Noodles" } },
  { image: "DSC02624 copiar.webp", category: "snacks", name: { pt: "Arroz de Xau Xau", en: "Yangzhou Fried Rice" } },
  { image: "DSC02626 copiar.webp", category: "meat", name: { pt: "Seleção de Almôndegas", en: "Mixed Meatballs" } },
  { image: "DSC02638 copiar.webp", category: "snacks", name: { pt: "Novilho Salteado", en: "Stir-fried Beef" } },
  { image: "DSC02480 copiar.webp", category: "desserts", name: { pt: "Gelatina com Açucar e Passa de Uva", en: "Gelatine with Sugar and Grape Raisin" } },
  { image: "DSC02432 copiar.webp", category: "desserts", name: { pt: "Bolas de Abóbora com Coco", en: "Pumpkin and Coconut Balls" } },
  { image: "DSC02546 copiar.webp", category: "desserts", name: { pt: "Mochi", en: "Mochi" } },
  { image: "DSC02406 copiar.webp", category: "desserts", name: { pt: "Massa de Arroz Glutinoso com Açúcar Moreno", en: "Glutinous Rice Cake with Brown Sugar" } },
  { image: "DSC02082 copiar.webp", category: "vegetables", name: { pt: "Mistura de Cogumelos", en: "Mixed Mushrooms" } },
  { image: "DSC02094 copiar.webp", category: "vegetables", name: { pt: "Mistura de Verduras", en: "Mixed Vegetables" } },
  { image: "DSC02256 copiar.webp", category: "vegetables", name: { pt: "Cogumelo Shiitake", en: "Shiitake Mushrooms" } },
  { image: "DSC02260 copiar.webp", category: "vegetables", name: { pt: "Cogumelo Agrocybe Aegerita", en: "Agrocybe Mushrooms" } },
  { image: "DSC02264 copiar.webp", category: "vegetables", name: { pt: "Cogumelo Enoki", en: "Enoki Mushrooms" } },
  { image: "DSC02222 copiar.webp", category: "vegetables", name: { pt: "Cogumelo Branco", en: "White Mushrooms" } },
  { image: "DSC02178 copiar.webp", category: "vegetables", name: { pt: "Raiz de Lótus", en: "Lotus Root" } },
  { image: "DSC02158 copiar.webp", category: "vegetables", name: { pt: "Milho", en: "Sweetcorn" } },
  { image: "DSC02211 copiar.webp", category: "vegetables", name: { pt: "Couve Chinesa", en: "Chinese Cabbage" } },
  { image: "DSC02219 copiar.webp", category: "vegetables", name: { pt: "Alga Gongcai", en: "Gongcai" } },
  { image: "DSC02229 copiar.webp", category: "vegetables", name: { pt: "Brotos de Bambu", en: "Bamboo Shoots" } },
  { image: "DSC02123 copiar.webp", category: "vegetables", name: { pt: "Alga Marinha", en: "Seaweed" } },
  { image: "DSC02120 copiar.webp", category: "vegetables", name: { pt: "Tofu Macio", en: "Soft Tofu" } },
  { image: "DSC02246 copiar.webp", category: "vegetables", name: { pt: "Tofu Congelado", en: "Frozen Tofu" } },
  { image: "DSC02280 copiar.webp", category: "vegetables", name: { pt: "Tofu de Pescado", en: "Fish Tofu" } },
  { image: "DSC02237 copiar.webp", category: "vegetables", name: { pt: "Fartura Chinêsa", en: "Fried Dough Sticks" } },
  { image: "DSC02199 copiar.webp", category: "vegetables", name: { pt: "Rolos de Tofu", en: "Tofu Rolls" } },
  { image: "DSC02242 copiar.webp", category: "vegetables", name: { pt: "Fatias de Batata", en: "Potato Slices" } },
  { image: "DSC02284 copiar.webp", category: "vegetables", name: { pt: "Fartura Chinêsa com Recheio de Gambas", en: "Fried Dough Sticks with Shrimp Paste" } },
  { image: "DSC02231 copiar.webp", category: "seafood", name: { pt: "Delícias do Mar", en: "Seafood Sticks" } },
  { image: "DSC02127 copiar.webp", category: "noodles", name: { pt: "Massa Udon", en: "Udon Noodles" } },
  { image: "DSC02170 copiar.webp", category: "noodles", name: { pt: "Macarrão de Batata Doce", en: "Sweet Potato Noodles" } },
  { image: "DSC02188 copiar.webp", category: "noodles", name: { pt: "Tallarines Chineses", en: "Chinese Noodles" } },
  { image: "DSC02190 copiar.webp", category: "vegetables", name: { pt: "Pasta de Arroz Tteokbokki", en: "Tteokbokki" } },
  { image: "DSC02646 copiar.webp", category: "snacks", name: { pt: "Salada de Pepino Picante", en: "Spicy Cucumber Salad" } }
];
