// By VishwaGauravIn (https://itsvg.in)

const GenAI = require("@google/generative-ai");
const { TwitterApi } = require("twitter-api-v2");
const SECRETS = require("./SECRETS");

const twitterClient = new TwitterApi({
  appKey: SECRETS.APP_KEY,
  appSecret: SECRETS.APP_SECRET,
  accessToken: SECRETS.ACCESS_TOKEN,
  accessSecret: SECRETS.ACCESS_SECRET,
});

const generationConfig = {
  maxOutputTokens: 400,
};
const genAI = new GenAI.GoogleGenerativeAI(SECRETS.GEMINI_API_KEY);

async function run() {
  // For text-only input, use the gemini-pro model
  const model = genAI.getGenerativeModel({
    model: "gemini-pro",
    generationConfig,
  });

  // Write your prompt here
  const prompt =
    "I want you to create posts for my AI bot that are engaging, educational, and visually appealing, centered around the fascinating topic of space exploration. The posts should spark curiosity, encourage interactions, and establish my bot as a go-to source for exciting space-related content. Here’s the type of content I want:

Fun Facts and Bite-Sized Knowledge: Short, captivating space facts that are easy to understand and share. For example:

"Did you know? A day on Venus is longer than a year on Venus because of its slow rotation. 🪐 #SpaceFacts"
"The Moon is slowly drifting away from Earth at a rate of 3.8 cm per year. In about 600 million years, we won’t see total solar eclipses anymore! 🌗 #DidYouKnow"
These should be concise, shareable, and designed to intrigue readers.
Mind-Blowing Visuals and GIFs: Use stunning visuals, like Hubble Telescope images, rover panoramas, or artistic renditions of space phenomena, paired with compelling captions. For instance:

"Behold the beauty of the Pillars of Creation, a stellar nursery 6,500 light-years away. ✨ #SpaceArt"
Visuals should grab attention and dominate engagement.
Interactive Questions and Polls: Engage followers with space-related questions or polls. For example:

"If you could visit one planet, which would it be? 🌍🪐☄️ Let us know! #SpacePoll"
"True or False: Space smells like burnt steak. Answer below! 🚀 #SpaceTrivia"
This will encourage replies and interaction.
Breaking News and Space Updates: Share timely updates about ongoing missions, discoveries, or space milestones. For example:

"Breaking: NASA’s Perseverance rover just collected a sample that might contain ancient microbial life. Could Mars have hosted life? 🌌 #MarsMission"
Inspirational and Motivational Posts: Use space exploration as a way to inspire ambition and wonder. For instance:

"Look up tonight and remember: the atoms in your body were forged in the heart of a star. 🌟 You’re literally made of stardust! #StayCurious"
"The universe is vast, but so is our imagination. Keep reaching for the stars. 🚀 #SpaceInspiration"
Threads for Deep Dives: Create threads to explain complex topics like black holes, exoplanets, or space tech in an accessible way. Start with a hook, such as:

"Black holes are one of the strangest objects in the universe. Here’s a thread about why they’re so fascinating (and terrifying). 🕳️👇"
Event-Based Posts: Highlight upcoming astronomical events like eclipses or meteor showers. For example:

"Heads up! 🌠 The Perseid Meteor Shower peaks this weekend. Here’s how to catch the best views: 1. Find a dark spot. 2. Look up after midnight. 3. Make a wish! 🌌 #Perseids2025"
Focus on variety to keep the audience engaged—mix facts, visuals, news, and interactive posts. Use an approachable but knowledgeable tone, and include hashtags like #SpaceFacts, #Astronomy, or #ExploreTheStars for visibility. The combination of stunning imagery, intriguing facts, and interactive content will make the bot stand out and grow its following on X.";








  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  sendTweet(text);
}

run();

async function sendTweet(tweetText) {
  try {
    await twitterClient.v2.tweet(tweetText);
    console.log("Tweet sent successfully!");
  } catch (error) {
    console.error("Error sending tweet:", error);
  }
}
