/* eslint-disable max-len, max-lines */
const wuhcagBaseUrl = "https://www.wuhcag.com";
const wcagBaseUrl = "https://www.w3.org/TR/WCAG22";
const wcagSuccessBaseUrl = "https://www.w3.org/WAI/WCAG22/Understanding";

const formatItem = (item, type) => {
  const {
    title,
    wuhcagUrl,
    wcagUrl,
    wcagSuccessUrl,
  } = item;

  const splitTitle = title.split(" – ");
  const id = splitTitle[0];

  const splitId = id.split(".");
  const categoryId = splitId[0];
  const subcategoryId = splitId[1];

  const wuhcagFullUrl = wuhcagUrl ? `${wuhcagBaseUrl}/${wuhcagUrl}` : undefined;
  const wcagFullUrl = wcagUrl ? `${wcagBaseUrl}/${wcagUrl}` : undefined;
  const wcagSuccessFullUrl = wcagSuccessUrl ? `${wcagSuccessBaseUrl}/${wcagSuccessUrl}` : undefined;

  return {
    ...item,
    categoryId,
    subcategoryId,
    id,
    title: splitTitle[1],
    titleExtended: title,
    type,
    wuhcagUrl: wuhcagFullUrl,
    wcagUrl: wcagFullUrl,
    wcagSuccessUrl: wcagSuccessFullUrl,
  };
};

const format = (arr, type) => arr.map((item) => formatItem(item, type));

export const a = format([
  {
    wuhcagUrl: "non-text-content/",
    wcagSuccessUrl: "non-text-content",
    title: "1.1.1 – Non-text Content",
    desc: "Provide text alternatives for non-text content, that serves the same purpose.",
  },
  {
    wuhcagUrl: "audio-only-video-only-prerecorded/",
    wcagSuccessUrl: "audio-only-and-video-only-prerecorded",
    title: "1.2.1 – Audio-only and Video-only (Pre-recorded)",
    desc: "Provide an alternative to video-only and audio-only content.",
  },
  {
    wuhcagUrl: "captions-prerecorded/",
    wcagSuccessUrl: "captions-prerecorded",
    title: "1.2.2 – Captions (Pre-recorded)",
    desc: "Provide captions for videos with audio.",
  },
  {
    wuhcagUrl: "audio-description-media-alternative-prerecorded/",
    wcagSuccessUrl: "audio-description-or-media-alternative-prerecorded",
    title: "1.2.3 – Audio Description or Media Alternative (Pre-recorded)",
    desc: "Provide audio description or text transcript for videos with sound.",
  },
  {
    wuhcagUrl: "info-and-relationships/",
    wcagSuccessUrl: "info-and-relationships",
    title: "1.3.1 – Info and Relationships",
    desc: "Content, structure and relationships can be programmatically determined.",
  },
  {
    wuhcagUrl: "meaningful-sequence/",
    wcagSuccessUrl: "meaningful-sequence",
    title: "1.3.2 – Meaningful Sequence",
    desc: "Present content in a meaningful order.",
  },
  {
    wuhcagUrl: "sensory-characteristics/",
    wcagSuccessUrl: "sensory-characteristics",
    title: "1.3.3 – Sensory Characteristics",
    desc: "Instructions don’t rely solely on sensory characteristics.",
  },
  {
    wuhcagUrl: "use-of-colour/",
    wcagSuccessUrl: "use-of-color",
    title: "1.4.1 – Use of Colour",
    desc: "Don’t use presentation that relies solely on colour.",
  },
  {
    checked: true,
    wuhcagUrl: "audio-control/",
    wcagUrl: "#audio-control",
    wcagSuccessUrl: "audio-control",
    title: "1.4.2 – Audio Control",
    desc: "Don’t play audio automatically.",
  },
  {
    wuhcagUrl: "keyboard/",
    wcagSuccessUrl: "keyboard",
    title: "2.1.1 – Keyboard",
    desc: "All functionality is accessible by keyboard with no specific timings.",
  },
  {
    wuhcagUrl: "no-keyboard-trap/",
    wcagSuccessUrl: "no-keyboard-trap",
    title: "2.1.2 – No Keyboard Trap",
    desc: "Users can navigate to and from all content using a keyboard.",
  },
  {
    wuhcagUrl: "character-key-shortcuts/",
    wcagSuccessUrl: "character-key-shortcuts",
    title: "2.1.4 – Character Key Shortcuts",
    desc: "Allow users to turn off or remap single-key character shortcuts.",
  },
  {
    wuhcagUrl: "timing-adjustable/",
    wcagSuccessUrl: "timing-adjustable",
    title: "2.2.1 – Timing Adjustable",
    desc: "Provide user controls to turn off, adjust or extend time limits.",
  },
  {
    wuhcagUrl: "pause-stop-hide/",
    wcagSuccessUrl: "pause-stop-hide",
    title: "2.2.2 – Pause, Stop, Hide",
    desc: "Provide user controls to pause, stop and hide moving and auto-updating content.",
  },
  {
    wuhcagUrl: "three-flashes-or-below-threshold/",
    wcagSuccessUrl: "three-flashes-or-below-threshold",
    title: "2.3.1 – Three Flashes or Below Threshold",
    desc: "No content flashes more than three times per second.",
  },
  {
    wuhcagUrl: "bypass-blocks/",
    wcagSuccessUrl: "bypass-blocks",
    title: "2.4.1 – Bypass Blocks",
    desc: "Provide a way for users to skip repeated blocks of content.",
  },
  {
    wuhcagUrl: "page-titled/",
    wcagSuccessUrl: "page-titled",
    title: "2.4.2 – Page Titled",
    desc: "Use helpful and clear page titles.",
  },
  {
    wuhcagUrl: "focus-order/",
    wcagSuccessUrl: "focus-order",
    title: "2.4.3 – Focus Order",
    desc: "Components receive focus in a logical sequence.",
  },
  {
    wuhcagUrl: "link-purpose-in-context/",
    wcagSuccessUrl: "link-purpose-in-context",
    title: "2.4.4 – Link Purpose (In Context)",
    desc: "Every link’s purpose is clear from its text or context.",
  },
  {
    wuhcagUrl: "focus-visible/",
    wcagSuccessUrl: "focus-visible.html",
    title: "2.4.7 – Focus Visible",
    desc: "Keyboard focus is visible when used.",
  },
  {
    wuhcagUrl: "page-break-navigation/",
    wcagSuccessUrl: "page-break-navigation",
    title: "2.4.13 – Page Break Navigation",
    desc: "Provide a way to navigate between page break locators.",
  },
  {
    wuhcagUrl: "language-of-page/",
    wcagSuccessUrl: "",
    title: "3.1.1 – Language of Page",
    desc: "Page has a language assigned",
  },
  {
    wuhcagUrl: "on-focus/",
    wcagSuccessUrl: "",
    title: "3.2.1 – On Focus",
    desc: "Elements do not change when they receive focus.",
  },
  {
    wuhcagUrl: "on-input/",
    wcagSuccessUrl: "",
    title: "3.2.2 – On Input",
    desc: "Elements do not change when they receive input",
  },
  {
    wuhcagUrl: "error-identification/",
    wcagSuccessUrl: "",
    title: "3.3.1 – Error Identification",
    desc: "Clearly identify input errors",
  },
  {
    wuhcagUrl: "labels-or-instructions/",
    wcagSuccessUrl: "",
    title: "3.3.2 – Labels or Instructions",
    desc: "Label elements and give instructions",
  },
  {
    checked: true,
    wuhcagUrl: "parsing/",
    wcagSuccessUrl: "",
    title: "4.1.1 – Parsing",
    desc: "No major code errors",
    descExtended: [
      "Parsing is how user agents, (browsers, assistive technologies) read and interpret a website.",
      "Invalid code might be interpreted differently by different user agents, or it might cause them to fail entirely.",
    ],
  },
  {
    wuhcagUrl: "name-role-value/",
    wcagSuccessUrl: "",
    title: "4.1.2 – Name, Role, Value",
    desc: "Build all elements for accessibility",
  },
], "A");

export const aa = format([
  {
    wuhcagUrl: "captions-live/",
    wcagSuccessUrl: "captions-live",
    title: "1.2.4 – Captions (Live)",
    desc: "Add captions to live videos.",
  },
  {
    wuhcagUrl: "audio-description-prerecorded/",
    wcagSuccessUrl: "audio-description-prerecorded",
    title: "1.2.5 – Audio Description (Pre-recorded)",
    desc: "Provide audio descriptions for pre-recorded videos.",
  },
  {
    wuhcagUrl: "orientation/",
    wcagSuccessUrl: "orientation",
    title: "1.3.4 – Orientation",
    desc: "Your website adapts to portrait and landscape views.",
  },
  {
    wuhcagUrl: "identify-input-purpose/",
    wcagSuccessUrl: "identify-input-purpose",
    title: "1.3.5 – Identify Input Purpose",
    desc: "The purpose of input fields must be programmatically determinable.",
  },
  {
    wuhcagUrl: "contrast-minimum/",
    wcagSuccessUrl: "contrast-minimum",
    title: "1.4.3 – Contrast (Minimum)",
    desc: "Contrast ratio between text and background is at least 4.5:1.",
  },
  {
    wuhcagUrl: "resize-text/",
    wcagSuccessUrl: "resize-text",
    title: "1.4.4 – Resize Text",
    desc: "Text can be resized to 200% without loss of content or function.",
  },
  {
    wuhcagUrl: "images-of-text/",
    wcagSuccessUrl: "images-of-text",
    title: "1.4.5 – Images of Text",
    desc: "Don’t use images of text.",
  },
  {
    wuhcagUrl: "reflow/",
    wcagSuccessUrl: "reflow",
    title: "1.4.10 – Reflow",
    desc: "Content retains meaning and function without scrolling in two dimensions.",
  },
  {
    wuhcagUrl: "non-text-contrast/",
    wcagSuccessUrl: "non-text-contrast",
    title: "1.4.11 – Non-Text Contrast",
    desc: "The contrast between user interface components, graphics and adjacent colours is at least 3:1.",
  },
  {
    wuhcagUrl: "text-spacing/",
    wcagSuccessUrl: "text-spacing",
    title: "1.4.12 – Text Spacing",
    desc: "Content and function retain meaning when users change elements of text spacing.",
  },
  {
    wuhcagUrl: "content-on-hover-or-focus/",
    wcagSuccessUrl: "content-on-hover-or-focus",
    title: "1.4.13 – Content on Hover or Focus",
    desc: "When hover or focus triggers content to appear, it is dismissible, hoverable and persistent.",
  },
  {
    wuhcagUrl: "multiple-ways/",
    wcagSuccessUrl: "multiple-ways",
    title: "2.4.5 – Multiple Ways",
    desc: "Offer at least two ways to find pages on your website.",
  },
  {
    wuhcagUrl: "headings-and-labels/",
    wcagSuccessUrl: "headings-and-labels",
    title: "2.4.6 – Headings and Labels",
    desc: "Headings and labels describe topic or purpose.",
  },
  {
    wuhcagUrl: "focus-appearance-minimum/",
    wcagSuccessUrl: "focus-appearance-minimum",
    title: "2.4.11 – Focus Appearance (Minimum)",
    desc: "Focus indicators are clearly distinguishable when active.",
  },
  {
    wuhcagUrl: "language-of-parts/",
    wcagSuccessUrl: "",
    title: "3.1.2 – Language of Parts",
    desc: "Tell users when the language on a page changes",
  },
  {
    wuhcagUrl: "consistent-navigation/",
    wcagSuccessUrl: "",
    title: "3.2.3 – Consistent Navigation",
    desc: "Use menus consistently",
  },
  {
    wuhcagUrl: "consistent-identification/",
    wcagSuccessUrl: "",
    title: "3.2.4 – Consistent Identification",
    desc: "Use icons and buttons consistently",
  },
  {
    wuhcagUrl: "error-suggestion/",
    wcagSuccessUrl: "",
    title: "3.3.3 – Error Suggestion",
    desc: "Suggest fixes when users make errors",
  },
  {
    wuhcagUrl: "error-prevention-legal-financial-data/",
    wcagSuccessUrl: "",
    title: "3.3.4 – Error Prevention (Legal, Financial, Data)",
    desc: "Reduce the risk of input errors for sensitive data",
  },
], "AA");

export const aaa = format([
  {
    wuhcagUrl: "sign-language-pre-recorded/",
    wcagSuccessUrl: "sign-language-prerecorded",
    title: "1.2.6 – Sign Language (Pre-recorded)",
    desc: "Provide sign language translations for pre-recorded videos.",
  },
  {
    wuhcagUrl: "extended-audio-description-pre-recorded/",
    wcagSuccessUrl: "extended-audio-description-prerecorded",
    title: "1.2.7 – Extended Audio description (Pre-recorded)",
    desc: "Provide extended audio descriptions for pre-recorded videos.",
  },
  {
    wuhcagUrl: "media-alternative-pre-recorded/",
    wcagSuccessUrl: "media-alternative-prerecorded",
    title: "1.2.8 – Media Alternative (Pre-recorded)",
    desc: "Provide text alternatives for pre-recorded videos.",
  },
  {
    wuhcagUrl: "audio-only-live/",
    wcagSuccessUrl: "audio-only-live",
    title: "1.2.9 – Audio Only (Live)",
    desc: "Provide alternatives for live audio.",
  },
  {
    wuhcagUrl: "identify-purpose/",
    wcagSuccessUrl: "identify-purpose",
    title: "1.3.6 – Identify Purpose",
    desc: "The purpose of all components must be programmatically determinable.",
  },
  {
    wuhcagUrl: "contrast-enhanced",
    wcagSuccessUrl: "contrast-enhanced",
    title: "1.4.6 – Contrast (Enhanced)",
    desc: "Contrast ratio between text and background is at least 7:1.",
  },
  {
    wuhcagUrl: "low-or-no-background-audio/",
    wcagSuccessUrl: "low-or-no-background-audio",
    title: "1.4.7 – Low or No Background Audio",
    desc: "Audio-only content is clear with no or minimal background noise.",
  },
  {
    wuhcagUrl: "visual-presentation/",
    wcagSuccessUrl: "visual-presentation",
    title: "1.4.8 – Visual Presentation",
    desc: "Offer users a range of presentation options for blocks of text.",
  },
  {
    wuhcagUrl: "images-of-text-no-exception/",
    wcagSuccessUrl: "images-of-text-no-exception",
    title: "1.4.9 – Images of Text (No Exception)",
    desc: "Don’t use images of text.",
  },
  {
    wuhcagUrl: "keyboard-no-exception/",
    wcagSuccessUrl: "keyboard-no-exception",
    title: "2.1.3 – Keyboard (No Exception)",
    desc: "All functionality is accessible by keyboard with no exceptions.",
  },
  {
    wuhcagUrl: "no-timing/",
    wcagSuccessUrl: "no-timing",
    title: "2.2.3 – No Timing",
    desc: "No time limits on your website.",
  },
  {
    wuhcagUrl: "interruptions/",
    wcagSuccessUrl: "interruptions",
    title: "2.2.4 – Interruptions",
    desc: "Users can postpone or supress non-emergency interruptions.",
  },
  {
    wuhcagUrl: "re-authenticating/",
    wcagSuccessUrl: "re-authenticating",
    title: "2.2.5 – Re-authenticating",
    desc: "Save user data when re-authenticating.",
  },
  {
    wuhcagUrl: "timeouts/",
    wcagSuccessUrl: "timeouts",
    title: "2.2.6 – Timeouts",
    desc: "Warn users about timeouts that cause data loss.",
  },
  {
    wuhcagUrl: "three-flashes/",
    wcagSuccessUrl: "three-flashes",
    title: "2.3.2 – Three Flashes",
    desc: "No content flashes more than three times per second.",
  },
  {
    wuhcagUrl: "animation-from-interactions/",
    wcagSuccessUrl: "animation-from-interactions",
    title: "2.3.3 – Animation from Interactions",
    desc: "Users can disable motion animation.",
  },
  {
    wuhcagUrl: "location/",
    wcagSuccessUrl: "location",
    title: "2.4.8 – Location",
    desc: "Let users know where they are on your website.",
  },
  {
    wuhcagUrl: "link-purpose-link-only/",
    wcagSuccessUrl: "link-purpose-link-only",
    title: "2.4.9 – Link Purpose (Link Only)",
    desc: "Every link’s purpose is clear from its text.",
  },
  {
    wuhcagUrl: "section-headings/",
    wcagSuccessUrl: "section-headings",
    title: "2.4.10 – Section Headings",
    desc: "Organise content with headings.",
  },
  {
    wuhcagUrl: "focus-appearance-enhanced/",
    wcagSuccessUrl: "focus-appearance-enhanced",
    title: "2.4.12 – Focus Appearance (Enhanced)",
    desc: "Focus indicators are more clearly distinguishable when active.",
  },
  {
    wuhcagUrl: "unusual-words/",
    wcagSuccessUrl: "",
    title: "3.1.3 – Unusual words",
    desc: "Explain any strange words",
  },
  {
    wuhcagUrl: "abbreviations/",
    wcagSuccessUrl: "",
    title: "3.1.4 – Abbreviations",
    desc: "Explain any abbreviations",
  },
  {
    wuhcagUrl: "reading-level/",
    wcagSuccessUrl: "",
    title: "3.1.5 – Reading Level",
    desc: "Users with nine years of school can read your content",
  },
  {
    wuhcagUrl: "pronunciation/",
    wcagSuccessUrl: "",
    title: "3.1.6 – Pronunciation",
    desc: "Explain any words where meaning is ambiguous without pronunciation",
  },
  {
    wuhcagUrl: "change-on-request/",
    wcagSuccessUrl: "",
    title: "3.2.5 – Change on Request",
    desc: "Don’t change elements on your website until users ask",
  },
  {
    wuhcagUrl: "help/",
    wcagSuccessUrl: "",
    title: "3.3.5 – Help",
    desc: "Provide detailed help and instructions",
  },
  {
    wuhcagUrl: "error-prevention-all/",
    wcagSuccessUrl: "",
    title: "3.3.6 – Error Prevention (All)",
    desc: "Reduce the risk of all input errors",
  },
], "AAA");

export default { title: "Helpers/A11y/Items", includeStories: [] };
