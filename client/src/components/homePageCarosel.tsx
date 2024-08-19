import { ModeToggle } from "@/components/mode-toggle";
import NavBarComp from "@/components/navBarComp";
import  React  from "react";
import { useState,useEffect } from "react";
import { Skeleton } from "@/components/ui/skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  type CarouselApi,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";
import { Separator } from "@/components/ui/separator";
import { GiBookmark, GiCrystalEye } from "react-icons/gi";
import { Button } from "@/components/ui/button";
import {Link} from "react-router-dom"
import { MangaList } from "@/types/types";
import fetchMangaList from "@/api/mangaHookAPiServices/getmanga";
import { useQuery} from "@tanstack/react-query";

interface HomeCaroselProp {
  mangaList: MangaList[];
}

const mangas: MangaList[] = [
  {
    id: "manga-nl991268",
    image: "https://ww6.mangakakalot.tv/mangaimage/manga-nl991268.jpg",
    title: "Sekai Saikyou No Shinjuu Tsukai",
    chapter: "Chapter 17.2",
    view: "6.5M",
    description:
      "Mag (Magu) was gifted the skill , a skill capable of attracting monsters and causing disasters. As such, he was banished from the city. Therefore, he decided to live alone in a hunting cabin deep in the mountains. However, there, he draws the attention of Divine Beasts: Loa the Dragon (a beautiful girl), Fiana the Phoenix (another beautiful girl), and Kelpie the Maera (another beautiful girl). In the end, Mag decides to spend a easygoing life in the mountains with the Divine Beasts. But the skill is not making it easy for him …",
  },
  {
    id: "manga-oj991744",
    image: "https://ww6.mangakakalot.tv/mangaimage/manga-oj991744.jpg",
    title: "Contender",
    chapter: "Chapter 47",
    view: "2.3M",
    description:
      "The powers Lin, Bing Dou, Zhe, Jie, Zhen, Lie, Qian and Xing make up the Nine Arts Mantra, bearing nine different indomitable powers. Upon nearing his demise, Ye Xuan used the powers of the Nine Arts Mantra to resurrect himself, thus draining the powers of the Mantra. To find back the strength for revenge, Ye Xuan was led on the path of restoring the Nine Arts Mantra.Birth of an Emperor,Lord of Nine Arts,mangabuddy is a website dedicated to fans of anime, , , , video games, and cosplay. Where you may find all of your anime-related memes, recommendations, reviews, manga recommendations, character fanfiction, favorite quotations, and simply those ordinary anime things that you enjoy, particularly memes.You can , online for free at mangabuddy. Chapters are updated hourly with high-quality graphics and a full English translation. Find free translations of your favorite , and . The latest updated content on mangabuddy is now available.",
  },
  {
    id: "manga-mv990156",
    image: "https://ww6.mangakakalot.tv/mangaimage/manga-mv990156.jpg",
    title: "Transmigration Game",
    chapter: "Chapter 69",
    view: "1.4M",
    description:
      "A girl from the 21st century fell into a manhole well playing a game. She then transmigrated and a gaming system where she finds herself in the body of Victoria Augustine, a wicked lady of a duke's mansion who enjoys bullying her 'brother', Shulin. Now, it has become her ultimate mission to help Shulin ascend to the throne... However... is he a puppy or a wolf?",
  },
  {
    id: "manga-of991488",
    image: "https://ww6.mangakakalot.tv/mangaimage/manga-of991488.jpg",
    title: "Ai Wo Kataru Nara Hisoyaka Ni",
    chapter: "Vol.3 Chapter 25.5",
    view: "3.7M",
    description:
      "The cold-hearted mafia and the maid who works for him -but for some reason, their relationship is a bit strange. In truth, he's actually a gentleman (Romeo) who is infatuated with his maid! Be it an expensive gift or the perfect date, he makes full use of everything he has to express his love... Is he aware of their social standings? A flashy, fun, and slightly dangerous romantic comedy.",
  },
  {
    id: "manga-or991674",
    image: "https://ww6.mangakakalot.tv/mangaimage/manga-or991674.jpg",
    title: "Betrothed To My Sister’S Ex",
    chapter: "Chapter 48",
    view: "2.3M",
    description:
      "With unmaintained red hair and shabby clothes, Marie, the baron's daughter, has been treated like a servant all her life. Count Granado, the country's richest man, who is said to be a difficult misogynist, falls in love with her at first sight. However, due to a misunderstanding, Count Granado proposes to her sister Anastasia, who looks like a princess, instead of the ragged Marie. A very popular work from \"Become a Novelist\"! Marie's Cinderella story that began with a hero's misunderstanding! / Zutaboro Reijou wa Ane no Moto Konyakusha ni Dekiai Sareru",
  },
  {
    id: "manga-oi991743",
    image: "https://ww6.mangakakalot.tv/mangaimage/manga-oi991743.jpg",
    title: "The Prince Regent’S Concubines",
    chapter: "Chapter 179",
    view: "1.8M",
    description:
      "In her previous life, Lin Yaoyue was framed by her lover and relatives. After dying in vain, she woke up to find that she was reborn in her youth. Lin Yaoyue vowed to make the villains pay for what they've done, but what she didn't expect was that Murong Jin, her enemy in her previous life, had become her lover in this lifeHow Much Extent Did The Embroidered Moon Intoxicate The Willow In The PlaceJi Du Jin Yue Zui Gong Liumangabuddy is a website dedicated to fans of anime, , , , video games, and cosplay. Where you may find all of your anime-related memes, recommendations, reviews, manga recommendations, character fanfiction, favorite quotations, and simply those ordinary anime things that you enjoy, particularly memes.You can ,  online for free at mangabuddy. Chapters are updated hourly with high-quality graphics and a full English translation. Find free translations of your favorite ,  and . The latest updated content on mangabuddy is now available.",
  },
  {
    id: "manga-nk990867",
    image: "https://ww6.mangakakalot.tv/mangaimage/manga-nk990867.jpg",
    title: "Murim Rpg Simulation",
    chapter: "Chapter 92: Episode 92",
    view: "31.6M",
    description:
      "A scout in the infamous Demon Cult, Seolhwi is on a routine patrol when his squad unexpectedly encounters a fearsome master of the Mount Hua Sect, the sworn enemies of the Demon Cult. Without warning, the Mount Hua Cult master slaughters the entire squad. As Seolhwi lies dying, lamenting years of service to the cult with nothing to show for it, he is suddenly faced with a video game prompt, asking if he would like to start again. Given the opportunity to start over and make different choices, Seolhwi vows to survive and become stronger so he can rise to the top of the Demon Cult.",
  },
  {
    id: "manga-ju986377",
    image: "https://ww6.mangakakalot.tv/mangaimage/manga-ju986377.jpg",
    title: "Truth Mask",
    chapter: "Chapter 98",
    view: "1.9M",
    description:
      "Student Wu Mian accidentally obtained a mask. Once you wear it, everyone will agree with whatever you say or do. Even then, he has no courage to confess to a girl that he secretly loves. Until an incident completely changes his whole life…",
  },
  {
    id: "manga-nc991285",
    image: "https://ww6.mangakakalot.tv/mangaimage/manga-nc991285.jpg",
    title:
      "The Fallen Brother Is Actually The Strongest: The Strongest Hero In History Is Reincarnated And Unknowingly Unmatched At The School",
    chapter: "Chapter 24",
    view: "31.1M",
    description:
      'Ochikobore Datta Ani Ga Jitsuha Saikyou: Shijou Saikyou No Yuusha Wa Tensei-shi, Gakuen De Mujikaku Ni Musou Suru mamnga, The fallen brother is actually the strongest-the strongest hero in history is reincarnated and unknowingly unmatched at the school- ,  Eugene, a hero, is forcibly reincarnated by the demon king Venomzard. In a world far in the future, he becomes a noble boy named Julius. Freed from his "hero" mission, Julius decides to enjoy his second life and his school life. However, his brother, Gaias, mocks him, and his parents and teachers consider him a failure. Having been reincarnated with the immense power of his previous life, Julius unknowingly becomes a warrior !',
  },
  {
    id: "manga-oc991737",
    image: "https://ww6.mangakakalot.tv/mangaimage/manga-oc991737.jpg",
    title: "You Have To Take Responsibility For Me",
    chapter: "Chapter 39",
    view: "1.1M",
    description:
      "You Have To Take Responsibility For Me summary is updating. Come visit MangaNato.com sometime to read the latest chapter of You Have To Take Responsibility For Me. If you have any question about this manga, Please don't hesitate to contact us or translate team. Hope you enjoy it.",
  },
  {
    id: "manga-og991741",
    image: "https://ww6.mangakakalot.tv/mangaimage/manga-og991741.jpg",
    title: "I’M Really Not A Supervillain",
    chapter: "Chapter 177",
    view: "14.2M",
    description:
      "The human world is shrouded in fear of the unknown. In order to survive, a few awakened people rose up to fight. Yilin, an unlucky man who couldn’t become a hero in time, was tragically assassinated when he killed the boss. Unexpectedly, he was born again and gained the ability of a villain leader. He was originally an ordinary man but he became the lifelong enemy of countless gods and demons. Hey, you guys, it’s too late to kneel down now…",
  },
  {
    id: "manga-no991271",
    image: "https://ww6.mangakakalot.tv/mangaimage/manga-no991271.jpg",
    title: "Staying With Ajumma",
    chapter: "Chapter 69",
    view: "31.3M",
    description:
      "Middle School Graduate Jeong-Hoo is an orphan… His only warmth was an Ajumma. He endures life day by day but in a place like this, can he be with his Ajumma forever?",
  },
];


const HomeCarosel: React.FC = () => {
  const [api, setApi] = useState<CarouselApi>();
  const [current, setCurrent] = useState(0);
  const [count, setCount] = useState(0);

  const { isPending, isError, data, error } = useQuery({
    queryKey: ["mangaList","topview"],
    queryFn: () => fetchMangaList({ page: 1, type: " topview " }),
  });

  useEffect(() => {
    if (!api) {
      return;
    }

    setCount(api.scrollSnapList().length);
    setCurrent(api.selectedScrollSnap() + 1);

    api.on("select", () => {
      setCurrent(api.selectedScrollSnap() + 1);
    });
  }, [api]);

  const handleDotClick = (index: number) => {
    if (api) {
      api.scrollTo(index); // Scroll to the corresponding slide index
    }
  };

  
  return (
    <div>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        plugins={[
          Autoplay({
            delay: 5000,
          }),
        ]}
        setApi={setApi}
        className="w-[100vw] md:w-[95vw] overflow-hidden mx-auto h-[20rem]"
      >
        <CarouselContent className="w-full h-full ">
          {isPending ? (
            <CarouselItem className="relative ">
              <div className="w-full flex p-2 h-[18rem] justify-center md:justify-around items-center">
                <Skeleton className="w-full bg-primary md:w-[11.6875rem] h-[17.25rem] md:h-[16.25rem] rounded-[0.5rem]  border-2 border-foreground relative" />
                <Skeleton className="w-2/3 hidden md:inline-block h-[16.25rem] rounded-[0.5rem] bg-primary  retro-box-shadow p-4" />
              </div>
            </CarouselItem>
          ) : (
            data?.mangaList.slice(0, 11).map((manga, index) => (
              <CarouselItem key={index} className="relative">
                <div className="w-full flex p-2 h-[18rem] justify-center md:justify-around  items-center">
                  <Link
                    to={`/manga-details/${manga.id}`}
                    className="w-full ml-3 md:w-[11.6875rem] h-[17.25rem] md:h-[16.25rem] rounded-[0.5rem] bg-foreground border-2 border-foreground relative"
                  >
                    <img
                      src={manga.image}
                      alt={`image for ${manga.title}`}
                      className="w-full  h-full rounded-[0.5rem] object-cover border-2 border-foreground"
                    />
                  </Link>
                  <Link
                    to={`/manga-details/${manga.id}`}
                    className="w-2/3 hidden md:inline-block h-[16.25rem] rounded-[0.5rem] bg-primary text-foreground retro-box-shadow p-4"
                  >
                    <h1 className="font-black capitalize w-full text-xl leading-[0.9rem] h-fit my-1">
                      {manga.title.slice(0, 55)}
                      {manga.title.length > 55 && "..."}
                    </h1>
                    <Separator className="bg-popover-foreground my-1" />
                    <p className="text-lg font-bold leading-[0.7rem] my-1">
                      Description
                    </p>
                    <p className="text-sm leading-[0.95rem] h-[67%]">
                      {manga.description.slice(0, 990)}{" "}
                      {manga.description.length > 990 && "..."}
                    </p>
                    <Separator className="bg-popover-foreground my-1" />
                    <div className="flex justify-between items-center">
                      <Button className="font-black flex items-center gap-1 text-sm capitalize bg-foreground text-primary hover:scale-105 hover:bg-foreground transition-all leading-[0.9rem] h-fit">
                        <GiBookmark />
                      </Button>
                      <p className="font-black flex items-center justify-end gap-1 text-sm capitalize leading-[0.9rem] h-fit">
                        <GiCrystalEye />
                        {manga.view}.views
                      </p>
                    </div>
                  </Link>
                </div>
                <h1 className="font-black text-center text-primary block md:hidden capitalize w-full text-xl">
                  {manga.title}
                </h1>
              </CarouselItem>
            ))
          )}
        </CarouselContent>
      </Carousel>

      {!isPending && (
        <div className="my-1 text-center flex gap-2 justify-center items-center text-sm text-muted-foreground">
          {Array.from({ length: 11 }).map((_, index) => (
            <div
              onClick={() => handleDotClick(index)}
              className={`w-3 h-3 rounded-full ${
                current == index + 1
                  ? "bg-primary"
                  : "bg-[rgb(28,28,28)] dark:bg-[rgb(240,249,255)]"
              } hover:bg-primary shadow-[.10rem_.10rem_0rem_-0.0025rem_rgb(28,28,28)]  border-2 border-[rgb(28,28,28)] dark:shadow-[.10rem_.10rem_0rem_-0.0025rem_rgb(240,249,255)]   dark:border-[rgb(240,249,255)] transition-all duration-150 ease-linear focus:font-extrabold
`}
            ></div>
          ))}
        </div>
      )}
    </div>
  );
};

export default HomeCarosel;
