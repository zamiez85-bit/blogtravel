import { BlogPost, Author, Category } from './types';
import mizaAvatar from './assets/images/miza_avatar_1782183683014.jpg';

export const blogAuthor: Author = {
  name: "Miza Rinjani",
  avatar: mizaAvatar,
  bio: "Seorang petualang paruh waktu dan pencerita visual. Terpikat oleh keindahan laut dan kebudayaan unik Penang, Malaysia, serta aroma kopi hangat di kedai kopi tradisional George Town.",
  socials: {
    instagram: "https://instagram.com/miza_rinjani",
    twitter: "https://twitter.com/miza_rinjani",
    youtube: "https://youtube.com/miza_rinjani_visuals",
    github: "https://github.com/miza_rinjani"
  }
};

export const blogCategories: { name: Category; count: number }[] = [
  { name: 'Pantai', count: 2 },
  { name: 'Gunung', count: 1 },
  { name: 'Kuliner', count: 1 },
  { name: 'Budaya', count: 1 },
  { name: 'Petualangan', count: 1 },
];

export const samplePosts: BlogPost[] = [
  {
    id: "post-1",
    title: "Menatap Kabut Kabur dan Sunset Damai dari Puncak Bukit Bendera",
    slug: "sunrise-bukit-bendera-penang",
    summary: "Catatan perjalanan menyaksikan magisnya pemandangan kota di atas jembatan gantung The Habitat, dipayungi kabut sejuk hutan hujan tropis tertua di dunia.",
    content: `Bukit Bendera (Penang Hill) selalu punya cara untuk memikat siapa saja yang datang berkunjung. Terletak di tengah Pulau Pinang dengan ketinggian 833 meter di atas permukaan laut, kawasan perbukitan ini menawarkan keindahan panorama alam yang sejuk dan menyegarkan diri di tengah hiruk-pikuk perkotaan.

### Keistimewaan Lanskap Pagi di The Habitat
Sebelum berkeliling, pagi buta kami memulai perjalanan menaiki kereta funikular legendaris untuk menangkap momen fajar menyelimuti George Town. Di The Habitat, kita bisa berjalan di atas jembatan gantung kanopi hutan purba yang sejuk. Kabut tipis menyelimuti pepohonan tinggi, memberikan sensasi damai yang tak ternilai bagi jiwa yang penat.

**Tips berkunjung ke Bukit Bendera:**
- Gunakan jaket ringan atau kardigan karena suhu udara di atas cukup sejuk.
- Pesan tiket kereta funikular lebih awal secara dalam talian untuk mengelakkan baris gilir yang panjang di pintu masuk utama.
- Jangan lepaskan peluang untuk berjalan santai di Curtis Crest Treetop Walk bagi menikmati pemandangan 360 darjah seluruh Pulau Pinang.`,
    category: "Gunung",
    imageUrl: "https://images.unsplash.com/photo-1542856391-010fb87dcfed?auto=format&fit=crop&q=80&w=800&h=500",
    date: "20 Jun 2026",
    readTime: "5 minit membaca",
    author: blogAuthor,
    likes: 245,
    comments: [
      { id: "c1", author: "Budi Santoso", text: "Cantik sekali pemandangannya! Jadi kangen naik kereta funikular ke Bukit Bendera lagi.", date: "21 Jun 2026" }
    ],
    featured: true
  },
  {
    id: "post-2",
    title: "Pesona Lembut Pasir Putih di Pantai Batu Ferringhi Penang",
    slug: "pesona-pantai-batu-ferringhi",
    summary: "Menikmati indahnya deburan ombak Selat Melaka dan semilir angin sore yang menenangkan di pesisir utara Pulau Pinang.",
    content: `Jika Anda mencari tempat bersantai melepas lelah setelah seharian menjelajahi warisan sejarah kota, Pantai Batu Ferringhi yang terletak di utara Pulau Pinang adalah jawabannya. Kawasan garis pantai berpasir halus ini terkenal akan keasrian alam lautnya yang memesona.

### Aktivitas Menarik di Tepi Pantai
Mulai dari berjalan bertelanjang kaki menyusuri ombak yang membasuh pantai pasir putih, hingga mencoba aktivitas olahraga air seperti parasailing dan jetski bagi pencari adrenalin. Sepanjang pantai, jajaran pohon keluarga palem melambai menyapa ramah setiap pejalan sore yang menanti matahari terbenam.

*Keindahan Batu Ferringhi bukan sekadar kawasan pelancongan biasa, melainkan estetika ketenangan pantai tropika Malaysia yang wajib kita pelihara bersama.*`,
    category: "Pantai",
    imageUrl: "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&q=80&w=800&h=500",
    date: "10 Jun 2026",
    readTime: "7 minit membaca",
    author: blogAuthor,
    likes: 156,
    comments: [
      { id: "c3", author: "Dian Pratama", text: "Destinasi impian saya tahun ini! Semoga bisa bersantai di tepi pantai Batu Ferringhi.", date: "11 Jun 2026" }
    ]
  },
  {
    id: "post-3",
    title: "Menyusuri Jejak Sejarah dan Kedalaman Spiritual Kuil Kek Lok Si Penang",
    slug: "sejarah-budaya-kek-lok-si-penang",
    summary: "Menghayati kemegahan arsitektur pagoda Buddha terbesar di Malaysia dan keindahan lampion malam George Town.",
    content: `Kuil Kek Lok Si yang berlokasi di Air Itam, Penang, bukan sekadar tempat ibadah biasa. Berdiri megah sejak akhir abad ke-19, kuil ini merupakan kompleks spiritual Buddha terbesar di Asia Tenggara yang sarat akan harmoni akulturasi budaya Tionghoa, Thailand, dan Burma.

### Keindahan Pagoda Tujuh Tingkat
Objek utama yang paling memukau adalah Pagoda Ban Po Thar setinggi 30 meter. Desain arsitekturnya unik: dasar pagoda mencerminkan gaya Tiongkok tradisional, bagian tengah bergaya Thailand, dan puncaknya berhiaskan kubah khas Burma. Perpaduan harmonis ini melambangkan persaudaraan dan perdamaian abadi.

Untuk mencapai kuil, kita diajak menyusuri lorong pasar tradisional yang menyajikan kedamaian tersendiri. Di atas bukit, patung perunggu Dewi Kwan Yin setinggi 36 meter menjulang tinggi menatap kota penuh berkah kasih sayang.`,
    category: "Budaya",
    imageUrl: "https://images.unsplash.com/photo-1584810359583-96fc3448beaa?auto=format&fit=crop&q=80&w=800&h=500",
    date: "18 Apr 2026",
    readTime: "6 minit membaca",
    author: blogAuthor,
    likes: 189,
    comments: []
  },
  {
    id: "post-4",
    title: "Kuliner Legenda Pulau Pinang: Eksplorasi Cita Rasa Char Kway Teow & Asam Laksa",
    slug: "kuliner-legenda-char-kway-teow-penang",
    summary: "Menemukan kelezatan aroma wajan herba arang tradisional mi goreng udang dan siraman kuah asam segar laksa Penang asli.",
    content: `Membicarakan Penang tanpa mengeksplorasi makanannya bagaikan mengunjungi Paris tanpa menatap menara Eiffel. Penang tersohor secara global sebagai surga makanan jalanan (Street Food) terbaik di Asia.

### Dimasak dengan Api Arang yang Membara
Rahasia kelezatan luar biasa Char Kway Teow terletak pada teknik "Wok Hei" atau aroma wajan besi yang membara. Mi beras pipih digoreng cepat dengan api arang yang menyala hebat bersama udang segar, kerang, tauge, kucai, dan kecap spesial. Rasanya gurih bercampur asap harum khas tradisional yang menggugah selera makan.

### Kesegaran Asam Laksa Berbumbu Ikan
Sebagai kuliner pendamping, semangkuk Asam Laksa dengan kuah kaldu ikan kembung, asam jawa, serai, dan bunga kantan siap memanjakan lidah. Dipadukan dengan mi beras licin, irisan mentimun, cabai, dan sesendok petis udang (Hae Ko), menghasilkan rasa gurih pedas manis yang meledak di mulu!`,
    category: "Kuliner",
    imageUrl: "https://images.unsplash.com/photo-1563245372-f21724e3856d?auto=format&fit=crop&q=80&w=800&h=500",
    date: "28 Mar 2026",
    readTime: "4 minit membaca",
    author: blogAuthor,
    likes: 95,
    comments: [
      { id: "c4", author: "Giri", text: "Membaca ulasannya jadi lapar sekali! Kuliner Penang memang tidak tertandingi rasanya.", date: "29 Mar 2026" }
    ]
  },
  {
    id: "post-5",
    title: "Menerobos Rimba Liar dan Trekking Istimewa di Taman Negara Pulau Pinang",
    slug: "trekking-taman-negara-penang",
    summary: "Keseruan trekking menembus tantangan hutan hujan tropis terkecil dunia menuju Pantai Kerachut dan Danau Meromiktik.",
    content: `Bagi pecinta petualangan ekstrem, Penang tidak hanya menyuguhkan wisata perkotaan bernuansa kolonial. Taman Negara Pulau Pinang menyimpan pesona hutan lindung asli seluas 1.213 hektar yang menantang kekuatan fisik Anda.

### Menembus Akar Pohon Raksasa dan Udara Lembab
Selama beberapa jam, kami memecah kesunyian rimbunnya hutan tropis tertua. Jalurnya menantang dengan akar pepohonan berusia ratusan tahun dan pendakian naik turun di tepi tebing yang membutuhkan kehati-hatian ekstra.

### Danau Meromiktik yang Sangat Langka
Di ujung trek, kelelahan kami lunas terbayar oleh pemandangan indah Danau Meromiktik di Pantai Kerachut. Danau unik ini memiliki dua lapisan air yang tidak bercampur: air tawar fajar yang dingin di atas, dan air laut asin yang hangat di bawah. Sungguh mahakarya orisinal alam yang memanjakan mata!`,
    category: "Petualangan",
    imageUrl: "https://images.unsplash.com/photo-1533105079780-92b9be482077?auto=format&fit=crop&q=80&w=800&h=500",
    date: "12 Mar 2026",
    readTime: "5 minit membaca",
    author: blogAuthor,
    likes: 112,
    comments: []
  },
  {
    id: "post-6",
    title: "Tantangan Ekstrem Mendaki Mercusuar Bersejarah Abbey George Town di Monkey Beach",
    slug: "monkey-beach-lighthouse-exploration",
    summary: "Menapaki jalur lereng terjal berliku demi mencapai mercusuar Muka Head abad ke-19 berlatar pemandangan spektakuler Selat Melaka.",
    content: `Pantai Monkey Beach di pesisir barat daya hutan lindung adalah salah satu pantai pasir keemasan yang cantik. Namun bagi petualang tangguh, tujuan utama sesungguhnya terletak jauh di puncak bukit di belakang pantai: Mercusuar Muka Head.

### Pendakian Curam Menguji Semangat
Mendaki jalur ke puncak mercusuar setinggi 242 meter ini membutuhkan kekuatan mental yang solid. Jalurnya merupakan jalur tanah sempit yang tertutup dedaunan lembab dan kayu tumbang alami dengan tingkat kecuraman yang ekstrem.

### Puncak Kepuasan di Atas Menara
Sesampainya di bangunan batu mercusuar bersejarah buatan Inggris tahun 1883 ini, kami menaiki tangga spiral menara besi tua. Begitu sampai di balkon luar, rasa letih langsung menguap terhempas angin laut yang kencang. Seluruh perairan Selat Melaka yang luas terhampar megah di bawah tatapan mata kita dengan birunya lautan tiada tepi yang menenangkan batin.`,
    category: "Pantai",
    imageUrl: "https://images.unsplash.com/photo-1537996194471-e657df975ab4?auto=format&fit=crop&q=80&w=800&h=500",
    date: "22 Feb 2026",
    readTime: "8 minit membaca",
    author: blogAuthor,
    likes: 310,
    comments: [
      { id: "c5", author: "Yudi K.", text: "Saya mencoba jalur ini bulan lalu, tanjakannya sungguh menantang tapi pemandangan laut dari atas mercusuar memang tiada duanya!", date: "23 Feb 2026" },
      { id: "c6", author: "Susi", text: "Keren banget kak, jadi ingin menantang diri sendiri ke sana!", date: "24 Feb 2026" }
    ]
  }
];
