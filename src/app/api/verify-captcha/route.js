

export async function POST(req) {
  const body = await req.json();
  const token = body.token;
  const secretKey = "6LfXyFMrAAAAAIQxgEmtdvnbhST_xKHKYHBJ8HwU"; // 👈 Replace with your real secret key from Google

  const res = await fetch(
    `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${token}`,
    {
      method: "POST",
    }
  );

  const data = await res.json();

  if (!data.success || data.score < 0.5) {
    return new Response(JSON.stringify({ message: "Verification failed", score: data.score }), {
      status: 400,
    });
  }

  return new Response(JSON.stringify({ message: "Verification passed", score: data.score }), {
    status: 200,
  });
}
