
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    id: "1",
    title: "Who am I?",
    content:
      "I’m a frontend developer with around 1 year of experience, focused on building clean, responsive, and user-friendly web interfaces using modern technologies.",
  },
  {
    id: "2",
    title: "What do I specialize in?",
    content:
      "I specialize in React.js and modern JavaScript, creating dynamic and interactive user interfaces with a strong focus on performance and usability.",
  },
  {
    id: "3",
    title: "What technologies do I use?",
    content:
      "I work with HTML5, CSS3, JavaScript (ES6+), React.js, Tailwind CSS, and tools like Git, Vite, and REST APIs for building modern web applications.",
  },
  {
    id: "4",
    title: "My development approach",
    content:
      "I focus on writing clean, maintainable code and building reusable components. I care about responsiveness, accessibility, and delivering a smooth user experience.",
  },
  {
    id: "5",
    title: "Can I work with APIs?",
    content:
      "Yes, I have experience integrating REST APIs using tools like fetch and Axios, handling data efficiently, and managing application state in React.",
  },
  {
    id: "6",
    title: "Do I work with UI/UX design?",
    content:
      "I can convert Figma or design files into pixel-perfect, responsive interfaces. I also have a good understanding of layout, spacing, and visual hierarchy.",
  },
  {
    id: "7",
    title: "Am I open to learning new technologies?",
    content:
      "Absolutely. I’m always learning and improving my skills, especially in areas like advanced React patterns, performance optimization, and modern frontend tools.",
  },
  {
    id: "8",
    title: "Am I available for work?",
    content:
      "Yes, I’m actively looking for frontend development opportunities where I can contribute, grow, and work on meaningful projects.",
  },
];

export function Accordion05() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <Accordion type="single" defaultValue="5" collapsible className="w-full">
        {items.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="last:border-b">
            <AccordionTrigger
              className="text-left pl-6 md:pl-14 overflow-hidden text-foreground/20 duration-200 hover:no-underline cursor-pointer -space-y-6 data-[state=open]:space-y-0 data-[state=open]:text-primary [&>svg]:hidden">
              <div className="flex flex-1 items-start gap-4">
                <p className="text-xs">{item.id}</p>
                <h1 className={`uppercase relative text-center text-3xl md:text-4xl`}>
                  {item.title}
                </h1>
              </div>
            </AccordionTrigger>

            <AccordionContent className="text-muted-foreground pb-6 pl-6 md:px-20">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
