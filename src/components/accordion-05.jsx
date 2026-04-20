
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const items = [
  {
    id: "1",
    title: "What kind of projects do you specialize in?",
    content:
      "I specialize in modern, responsive web applications using React and JavaScript. Most of my work focuses on clean UI, smooth user experience, and scalable frontend architecture. Whether it's a dashboard, landing page, or full web app, I aim to deliver something that looks great and performs reliably.",
  },
  {
    id: "2",
    title: "Why should I choose you over other developers?",
    content:
      "I focus on both design and functionality—not just writing code. I pay close attention to UI details, responsiveness, and performance. Plus, I communicate clearly, meet deadlines, and make sure the final product aligns with your goals, not just the requirements.",
  },
  {
    id: "3",
    title: "Can you handle both design and development?",
    content:
      "Yes. While my main strength is frontend development, I can translate design ideas (Figma or rough concepts) into clean, pixel-perfect interfaces. I also make UX improvements where needed to enhance usability.",
  },
  {
    id: "4",
    title: "How do you ensure code quality?",
    content:
      "I write clean, reusable, and well-structured code following best practices. I also test components, optimize performance, and make sure everything works smoothly across devices and browsers.",
  },
  {
    id: "5",
    title: "Do you work with backend technologies as well?",
    content:
      "Yes, I have experience with the MERN stack (MongoDB, Express.js, React, Node.js). While my main focus is frontend, I can integrate APIs and handle full-stack features when needed.",
  },
  {
    id: "6",
    title: "How do you communicate during a project?",
    content:
      "I keep communication simple and consistent. I provide regular updates, share progress, and make sure you're always aware of what's happening. I’m also open to feedback at every stage.",
  },
  {
    id: "7",
    title: "Can you work with existing code or projects?",
    content:
      "Absolutely. I can jump into existing projects, understand the structure, fix issues, improve UI, or add new features without disrupting the current workflow.",
  },
  {
    id: "8",
    title: "What is your development process like?",
    content:
      "I usually start by understanding your requirements clearly, then break the project into manageable parts. I build step-by-step, share progress, gather feedback, and refine until everything is exactly how you want.",
  },
  {
    id: "9",
    title: "How do you handle deadlines?",
    content:
      "I take deadlines seriously. I plan tasks properly and communicate early if anything needs adjustment. My goal is to deliver on time without compromising quality.",
  },
];

export function Accordion05() {
  return (
    <div className="w-full max-w-5xl mx-auto">
      <Accordion type="single" defaultValue="5" collapsible className="w-full flex flex-col items-start justify-start">
        {items.map((item) => (
          <AccordionItem value={item.id} key={item.id} className="last:border-b">
            <AccordionTrigger
              className="text-left pl-6 md:pl-14 overflow-hidden text-foreground/40 duration-200 hover:no-underline cursor-pointer -space-y-6 data-[state=open]:space-y-0 data-[state=open]:text-primary [&>svg]:hidden">
              <div className="flex flex-1 items-start gap-4">
                <p className="text-xs">{item.id}</p>
                <h1 className={`uppercase relative text-3xl md:text-4xl`}>
                  {item.title}
                </h1>
              </div>
            </AccordionTrigger>

            <AccordionContent className="text-muted-foreground text-base pb-6 pl-6 md:px-20">
              {item.content}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  );
}
