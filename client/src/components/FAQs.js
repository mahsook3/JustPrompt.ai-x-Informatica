import { useRef, useState } from "react";

const FaqsCard = (props) => {
  const answerElRef = useRef();
  const [state, setState] = useState(false);
  const [answerH, setAnswerH] = useState("0px");
  const { faqsList, idx } = props;

  const handleOpenAnswer = () => {
    const answerElH = answerElRef.current.childNodes[0].offsetHeight;
    setState(!state);
    setAnswerH(`${answerElH + 20}px`);
  };

  return (
    <div
      className="space-y-3 mt-5 overflow-hidden border-b"
      key={idx}
      onClick={handleOpenAnswer}
    >
      <h4 className="cursor-pointer pb-5 flex items-center justify-between text-lg text-gray-700 font-medium" >
        <span id="Translatable">{faqsList.q}</span>
        {state ? (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              stroke-width="2"
              d="M20 12H4"
            />
          </svg>
        ) : (
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5 text-gray-500 ml-2"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 4v16m8-8H4"
            />
          </svg>
        )}
      </h4>
      <div
        ref={answerElRef}
        className="duration-300"
        style={state ? { height: answerH } : { height: "0px" }}
      >
        <div>
          <p className="text-gray-500" id="Translatable">{faqsList.a}</p>
        </div>
      </div>
    </div>
  );
};

export default () => {
  const faqsList = [
    ,
    {
      q: "Does JustPrompt help with cross-border regulations and government incentives for e-commerce sellers?",
      a: "Yes, JustPrompt provides resources and guidance on cross-border regulations and government incentives for e-commerce sellers. Our platform includes tools and information to help you navigate international trade laws and take advantage of available incentives to grow your business.",
    },
    {
      q: "Is my online presence secure with JustPrompt?",
      a: "Yes, security is a top priority for us. All online presences built with JustPrompt include SSL encryption to protect your data and ensure secure transactions for your customers. We also perform regular security updates and offer features like secure payment gateways to safeguard your online presence against threats.",
    },
    {
      q: "Can I customize the templates to match my brand?",
      a: "Yes, you can fully customize our pre-built templates to match your brand. You can change colors, fonts, images, and layout to ensure your online presence reflects your unique style and branding. The drag-and-drop interface makes it easy to adjust elements and preview changes in real-time.",
    },
    {
      q: "Is there customer support available?",
      a: "Absolutely! We offer 24/7 customer support to assist you with any questions or issues you may encounter. You can reach us via phone, email, or live chat. Additionally, our comprehensive help center and tutorials are available to guide you through common tasks and features.",
    },
    {
      q: "Do I need any technical skills to use JustPrompt?",
      a: "No technical skills are required to use JustPrompt. Our platform is designed to be user-friendly and intuitive, allowing anyone to create a professional online presence using our drag-and-drop interface. Pre-built templates and easy integrations further simplify the process.",
    },
    {
      q: "Can I use my own domain name with JustPrompt?",
      a: "Yes, you can use your own custom domain name with JustPrompt. During the setup process, you will have the option to connect an existing domain or purchase a new one. Our support team is available to help you with the domain setup if needed.",
    },
    {
      q: "How do I integrate my social media accounts with JustPrompt?",
      a: "Integrating your social media accounts with JustPrompt is straightforward. From your dashboard, navigate to the integration section, select the social media platforms you want to connect, and follow the prompts to authorize the connection. This allows you to manage your social media presence and monitor engagement directly from your JustPrompt account.",
    },
  ];

  return (
    <section className="leading-relaxed max-w-screen-xl mt-12 mx-auto px-4 md:px-8">
      <div className="space-y-3 text-center">
        <h1 className="text-3xl text-gray-800 font-semibold" id="Translatable">
          Frequently Asked Questions
        </h1>
        <p className="text-gray-600 max-w-lg mx-auto text-lg" id="Translatable">
          Answered all frequently asked questions, Still confused? feel free to
          contact us.
        </p>
      </div>
      <div className="mt-14 max-w-2xl mx-auto">
        {faqsList.map((item, idx) => (
          <FaqsCard idx={idx} faqsList={item} />
        ))}
      </div>
    </section>
  );
};
