import baseraImg from "@/assets/photos/basera.jpg";
import basera1Img from "@/assets/photos/basera-1.jpg";
import basera2Img from "@/assets/photos/basera-2.jpg";
import roseImg from "@/assets/photos/rose.jpg";
import rose2Img from "@/assets/photos/rose-2.jpg";
import selfieImg from "@/assets/photos/selfie.jpg";
import sunshineImg from "@/assets/photos/sunshine.png";
import selfie2Img from "@/assets/photos/selfie-2.jpg";
import mirrorImg from "@/assets/photos/mirror.jpg";
import flowerImg from "@/assets/photos/flower.png";
import birthdayImg from "@/assets/photos/birthday.jpg";
import birthday1Img from "@/assets/photos/birthday-1.jpg";

export type Photo = { src?: string; alt: string; label?: string; memory?: string };

export const birthday = {
  name: "Anshika",
  creator: "Ankit",
  group: "Basera",

  cover: {
    line1: "Happy Birthday",
    line2: "ANSHIKA!",
    sub: "A little surprise, just for you.",
    cta: "click to open",
  },

  intro: {
    heading: "Dear Anshika,",
    lines: [
      "Aaj no deadlines, no serious talks, no random responsibilities.",
      "Bas aaj ka din tumhare naam.",
      "Toh relax, enjoy the little surprises, and don't judge the amount of effort that went into this.",
      "(Okay, maybe judge a little.)",
    ],
    photo: { src: birthdayImg, alt: "Anshika", label: "the birthday girl", memory: "The birthday girl herself." } as Photo,
  },

  sides: {
    heading: "A few things that make you, you.",
    items: [
      { caption: "The Smile", line: "Okay, fine. This one deserves its own spot.", photo: { src: flowerImg, alt: "The Smile", memory: "The Smile — Okay, fine. This one deserves its own spot." } as Photo },
      { caption: "The Chaos", line: "Because apparently, normal is a little too boring.", photo: { src: selfieImg, alt: "The Chaos", memory: "The Chaos — Because apparently, normal is a little too boring." } as Photo },
      { caption: "The Sunshine", line: "Being effortlessly photogenic is a bit unfair, honestly.", photo: { src: sunshineImg, alt: "The Sunshine", memory: "The Sunshine — Being effortlessly photogenic is a bit unfair, honestly." } as Photo },
      { caption: "The Strong One", line: "Handling life like a pro. Complaining about it is optional.", photo: { src: selfie2Img, alt: "The Strong One", memory: "The Strong One — Handling life like a pro." } as Photo },
      { caption: "The Original", line: "One of one. No duplicates available.", photo: { src: birthday1Img, alt: "The Original", memory: "The Original — One of one. No duplicates available." } as Photo },
    ],
  },

  team: {
    heading: "Different screens. Same madness.",
    body: [
      "Alag-alag jagah se kaam karte hain, but somehow random conversations, unexpected chaos aur beech-beech ki bakchodi workday ka part ban hi jaati hai.",
      "And somewhere between all that, we actually get things done. Miracles happen.",
    ],
    notes: ["Work mode: allegedly ON", "One quick discussion = 45 minutes", "Somehow, we get things done."],
    main: { src: baseraImg, alt: "The Basera group", label: "team photo", memory: "The Basera gang, somehow all in one frame." } as Photo,
    extras: [
      { src: basera2Img, alt: "Anshika", label: "portrait", memory: "A good memory with the team." },
      { src: basera1Img, alt: "Video call", label: "screenshot", memory: "Different screens, same madness." },
    ] as Photo[],
  },

  note: {
    heading: "And a little note, just for you.",
    cta: "OPEN NOTE",
    envelope: "A tiny note for you.",
    paragraphs: [
      "Hey Anshika,",
      "Wishing you a very happy birthday!",
      "It's genuinely nice having you as part of the team. From random conversations to all the little moments in between, it's always nice when work becomes a little more fun because of the people around you.",
      "Hope this year brings you lots of happiness, exciting opportunities, good memories, new adventures, and plenty of reasons to smile.",
      "Keep being yourself, keep doing your thing, and don't let the everyday chaos steal all your fun.",
      "Here's to a year full of good surprises, happy moments, and things that make you genuinely excited. Hope you have the best birthday — you deserve it!",
    ],
    signature: "— Ankit",
    photo: { src: rose2Img, alt: "Anshika", label: "for Anshika", memory: "A special moment, penned straight from the heart." } as Photo,
  },

  wishes: {
    heading: "Things we're wishing for you.",
    photo: { src: birthdayImg, alt: "Anshika", label: "centre photo", memory: "Wishing you the happiest year ahead, Anshika!" } as Photo,
    items: [
      { title: "More happy days", line: "I hope you find happiness in the little things, get more reasons to laugh, and have people around who make even an ordinary day feel special." },
      { title: "More adventures", line: "More places to explore, more new things to try, and more stories that start with ‘Okay, so guess what happened…’" },
      { title: "More wins", line: "I hope all the effort you put into things takes you somewhere amazing, and that you get to celebrate every little win along the way." },
      { title: "Less stress", line: "Less overthinking, fewer unnecessary worries, more peaceful days — and absolutely no guilt about taking a break when you need one." },
    ],
    flaps: [
      { label: "A little reminder", message: "You don't need to have everything figured out. You're allowed to take your time, too." },
      { label: "Open for a laugh", message: "May your plans work out, your food arrive hot, and your ‘just five more minutes’ actually be five minutes." },
      { label: "A birthday wish", message: "I hope this next chapter brings you people worth keeping, moments worth remembering, and opportunities worth getting excited about." },
      { label: "One last thing", message: "Birthday rule: no feeling guilty about relaxing, no worrying about tomorrow. Today is yours, so enjoy it properly." },
    ],
  },

  prank: {
    heading: "Okay Anshika, one last thing before the cake…",
    body: "You've got a birthday gift waiting. Just accept it.",
    cta: "ACCEPT YOUR GIFT",
    dodges: 6,
    message: [
      "Congratulations!",
      "You've successfully wasted 8 seconds.",
      "Your actual gift is a whole website made just for your birthday.",
      "Happy Birthday, Anshika!",
    ],
    signature: "— A little surprise from your friends",
    next: "OKAY, NOW SHOW ME THE CAKE",
  },

  wish: {
    heading: "Okay, birthday girl.",
    body: "Close your eyes. Make a wish. Don't tell us what it is.",
    cta: "MAKE YOUR WISH",
    after: "Hope this year surprises you in all the best ways.",
  },

  final: {
    heading: "And that's a wrap!",
    lines: [
      "One birthday, a bunch of memories, and lots of good wishes.",
      "Happy Birthday once again, Anshika. Here's to another year of good things, great memories, and stories worth keeping.",
    ],
    tab: "P.S. Who put all this together?",
    reveal: ["A little something by Ankit.", "Hope this made you smile. Have a wonderful birthday!"],
    signature: "— Ankit",
    photo: { src: birthday1Img, alt: "Anshika", label: "memories", memory: "Happy Birthday once again, Anshika!" } as Photo,
    photos: [{ src: birthday1Img, alt: "Anshika", label: "memories" }] as Photo[],
  },
};
