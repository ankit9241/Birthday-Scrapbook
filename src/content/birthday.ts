/**
 * Central content for Anshika's birthday scrapbook.
 * To add real photos: drop files into src/assets/photos/, import them here,
 * and set `src` on the matching entry. Entries without `src` show a marked placeholder.
 */

/** `memory` is the handwritten caption shown when the photo is opened. */
export type Photo = { src?: string; alt: string; label?: string; memory?: string };

export const birthday = {
  name: "Anshika",
  creator: "Ankit",
  group: "Basera",

  cover: {
    line1: "Happy Birthday",
    line2: "ANSHIKA!",
    sub: "A little something, made just for you.",
    cta: "click to open",
  },

  intro: {
    heading: "Dear Anshika,",
    lines: [
      "Aaj no deadlines, no work discussions,",
      "no ‘ek minute, ek cheez check karna’.",
      "Bas aaj ka din tumhare naam.",
      "So sit back, and let us make a little noise for you.",
    ],
    photo: { alt: "Anshika", label: "a favourite photo", memory: "The birthday girl herself." } as Photo,
  },

  sides: {
    heading: "A few things that make you, you.",
    items: [
      { caption: "The Smile", line: "The kind that makes an ordinary moment better.", photo: { alt: "Anshika smiling" } as Photo },
      { caption: "The Chaos", line: "Because peace and quiet were never the whole plan.", photo: { alt: "Anshika, candid" } as Photo },
      { caption: "The Sunshine", line: "Bringing your own little energy into the room.", photo: { alt: "Anshika outdoors" } as Photo },
      { caption: "The Strong One", line: "Handling more than people probably realise.", photo: { alt: "Anshika" } as Photo },
      { caption: "The Original", line: "No replacement. No duplicate. Just Anshika.", photo: { alt: "Anshika portrait" } as Photo },
    ],
  },

  team: {
    heading: "Different screens. Same madness.",
    body: "We may work from different places, but somehow the random conversations, unexpected chaos and little moments find their way into every workday.",
    notes: ["Work mode: allegedly ON", "One quick discussion = 45 minutes", "Somehow, we get things done."],
    main: { alt: "The Basera group", label: "team photo", memory: "The Basera gang, somehow all in one frame." } as Photo,
    extras: [{ alt: "Anshika", label: "portrait" }, { alt: "Video call", label: "screenshot" }] as Photo[],
  },

  note: {
    heading: "And a little note, just for you.",
    cta: "OPEN NOTE",
    envelope: "A tiny note for you.",
    paragraphs: [
      "Hey Anshika,",
      "Wishing you a very happy birthday!",
      "It's genuinely nice having you as part of the Basera gang. Hope this year brings you lots of happiness, exciting opportunities, good memories, and plenty of reasons to smile.",
      "Keep being yourself, keep doing your thing, and don't let the work chaos steal all your fun.",
      "Have the best day. You deserve it!",
    ],
    signature: "— Ankit",
    photo: { alt: "Anshika", label: "small photo" } as Photo,
  },

  wishes: {
    heading: "Things we're wishing for you.",
    photo: { alt: "Anshika", label: "centre photo" } as Photo,
    items: [
      { title: "More happy days", line: "The kind you wish could last a little longer." },
      { title: "More adventures", line: "New places, new stories, better photographs." },
      { title: "More wins", line: "Big achievements and tiny victories, too." },
      { title: "Less stress", line: "Because you've earned a break from all the chaos." },
    ],
    flaps: [
      { label: "A little reminder", message: "You've got plenty of good things ahead." },
      { label: "Open for a laugh", message: "May your meetings be short and your snacks be unlimited." },
      { label: "A birthday wish", message: "More adventures, more memories, and more reasons to smile." },
      { label: "One last thing", message: "Don't forget to enjoy your own birthday." },
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
    signature: "— A little surprise from your Basera gang",
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
    photos: [{ alt: "Anshika" }, { alt: "Anshika" }, { alt: "Anshika" }, { alt: "Basera group" }] as Photo[],
  },
};
