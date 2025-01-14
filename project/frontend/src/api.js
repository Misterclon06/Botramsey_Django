export async function getMessage() {
    const response = await fetch("/mom/");
    const data = await response.json();
    return data;
  }
  