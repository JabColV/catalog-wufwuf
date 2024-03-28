async function loadAnimals() {
  const response = await fetch(
    `${process.env.NEXT_PUBLIC_BACKEND_URL}/animals`
  );
  const data = await response.json();
  return data;
}
