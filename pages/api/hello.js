// Next.js API route support: https://nextjs.org/docs/api-routes/introduction

export default async (req, res) => {
  const reponse = await fetch("https://api.github.com/");
  const data = await reponse.json();

  res.statusCode = 200;
  res.json(data);
};
