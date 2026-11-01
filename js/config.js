/* ============================================================
   EDIT THIS FILE ONLY. Sab text, names, passcode yahin se badlo.
   Photos -> media/photos/   Videos -> media/videos/   Music -> media/music/
   ============================================================ */
const CONFIG = {
  name: "Kulkuleeeee",              // <-- uska naam
  from: " From Bhooootttttt",         // <-- tera naam (letter ke end mein)
    // ---- INTRO (Yes / No wala pehla step) ----
  introChar: "🐈",           // cartoon emoji
  introImg: "",              // apni image chahiye to "char.png" likho (media/ folder mein)
  introAsk: "Dekhna chahogi? 👀",
  introYes: "Yes",
  introNo: "No",
  introAngry: [
    "HOW DARE YOU!? 😤",
    "Phir se No?! 😡",
    "Dil toot gaya 💔",
    "Arey itni bhi kya zid!"
  ],
  introTry: "Try again",
  introExcited: "Are you really excited? 😏",
  introYes2: "Yes",

  // ---- BALLOON REASONS (har balloon phodne par ek card) ----
  reasons: [
    "Yawrrrr apka v Shi hai isss janam mein itna pyara sa insan apko mil gya😏",
    "Khadooos aur kanjoos dono ho gyi hoooo 😂",
    "Btw!!Tomake ami ek baat bolta, Ritesh se acha bachha koi nhi hota",
    "Babliiiii Badmoshhh😂",
    "Thumak Thumak ho jaye kya😭"
  ],

  // ---- PASSCODE ----
  passcode: "0211",          // <-- kuch aisa rakho jo sirf wo jaanti ho (birthday date, nickname...)
  gateTitle: "Secret Password 🔐",
  gateText: "Yahan sirf VIP andar aa sakte hain. Password batao 😏",
  hints: [
    "Hint 1: Kya doctor thora sochoo yrrr. Dhoondhoooo dhundhoooo!",
    "Hint 2: Itna toh aasan hai, shayad.",
    "Hint 3: Arre nahi pata? Acha chloooo 500 Paytm kroooo 😂"
  ],
  wrongReplies: [
    "Galat!Galat! CID ko bulayein? 🕵️",
    "Phir galat. Ap sach mein VIP hai na? 🤨",
    "Doctor madam, Commonn yrr dimaag lagaiyeee 🧠",
    "Chalo chalo, ek aur try 😂"
  ],

  introSmall: "Sochaaaa Badmossshiii ho jayeee ",
  introTitle: "Kisi ke liye toh kuch bnaya hai mene😜",
  subtitle: "Buddhiiii hone ka wakth aa hi gyaaa😂😜",
  music: "media/music/song.mp3",

  // ---- CARTOONS (tap karne par) ----
  toonReplies: [
    "Meow!Meow!Meow,Billi bole Khaoogiiii kya rasmalaiiii🐱",
    "Teddy ne bola: Ritesh is a good boyyyyy 🧸",
    "Ahhh!! Aise marta hai kya koi😂"
  ],

   // ---- "NO" PAKAD KE DIKHA (No button bhaagta rahega, Yes dabane par photos khulengi) ----
  pleadQuestion: "Sach sach batao: tum sabse mast ho na? 😎",
  pleadIntro: "Yes ya No? Soch samajh ke dabana…",
  pleadYes: "Yes, obviously 😎",
  pleadNoText: "No",
  pleadLines: [
    "Arey maan jao na… 🥺",
    "Pakad ke dikha 😜",
    "Itni slow? 🐢",
    "Haha miss! 😂",
    "No ko pakadna impossible hai 😈",
    "Chhoot gaya, ek aur koshish?",
    "Dekh teddy bhi hans raha hai 🧸",
    "Ab toh Yes daba de yaar 🥺"
  ],
  pleadDone: "Pata tha! Ye dekho proof 📸😂",
  // Yes dabane par ye photos khulengi. Files media/photos/ mein daalo
  pleadPhotos: [
    { file: "plead1.png", caption: "Proof #1" },
    { file: "plead2.png", caption: "Proof #2" },
    { file: "plead3.png", caption: "Proof #3" }
  ],

  photos: [
    { file: "photo1.png", caption: "Yeh kaun hai 😂" },
    { file: "photo2.png", caption: "Pose maar rahi hai" },
    { file: "photo3.png", caption: "Best candid" },
    { file: "photo6.png", caption: "Kuch bhi ho jaye, smile pakki" },
    { file: "photo4.png", caption: "Aankhien Dekhoooo jara !! hai na sundar" },
    { file: "photo7.png", caption: "Mast din tha" },
    { file: "photo5.png", caption: "Hai kya koi mujhse jyada sundar" },
    { file: "photo9.png", caption: "Hehe Me pariiii" }
  ],

  // Tere edits music ke saath rahenge. Bas file name same rakhna.
  videos: [
    { file: "video1.mp4", caption: "Badmoshhhh 🎬" },
    { file: "video2.mp4", caption: "Boxer hi kehde 🔥" }
  ],

  wishes: [
    "Hamesha khush raho 😄",
    "Zyada drama mat karna (sirf thoda 😜)",
    "Saare exams/kaam easy ho jaye 📚",
    "Wifi hamesha full speed pe ⚡",
    "Free food har jagah 🍕",
    "Neend poori ho, alarm baje hi nahi 😴",
    "Sab sapne pure ho ✨",
    "Paise hi paise, shopping hi shopping 🛍️",
    "Hamesha hanse, hamesha selfies 😎",
    "Bas mast raho, chill raho 🌈",
    "Fir pareshan krne agli baar aaunga 🤝",
    "Is saal sab mast jayega 🎉",
    "Meri treat yaad rakhna 😂",
    "say cheeseeee📸",
    "Tension door, masti paas 💫",
    "Gussa kam, chocolate and kulkule zyada 🍫",
    "Naye saal mein naye adventures 🌍",
    "Sabko pagal karti raho 😂"
  ],

   letterTitle: "Dear Brithy Mam,",
  letter: [
    "Happiessttt Happiessttt B'day Brithy Mam!!! Bhagwan ji Bhaiiii dher dher sara ashirwad apko dein...!!",

    "Ummmm Hmesha khush rahiye mushkurate rahiye ....aur hmesha golu si molu si kulkule hi rehnaaaa...be always as u are be happiest be confident and always be strong....",

    "Hmesha mstiii krte rehna aur thore mujhe nakhre km dikhaooo rrrr ....bsssss khushhhhh raho mstttt rahoo...mujh pr gundagardi km dikhaoooo ....",

    "aur jldi se apne bday ki party mujhe de jaoooo.....heheee once again happiest bday apko ,,,khush rahiye aur mera ashirwad hmesha apke sath rahe swaahhhhhhh"
  ],
  finalMessage: "Ummmm Tata tata !! Bhagwan Sari manokamna puri krein apki!! 🎂😂"
};
  
