interface Props {
  to: string;
  textContent: string;
  id: string;
}

const Link = ({ to, textContent, id }: Props) => {
  const $link = `
  <a href="${to}">
    <Button id="${id}" data-route>${textContent}</Button>
  </a>`;

  return $link;
};

export default Link;
