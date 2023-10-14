const SearchItems = (prop) => {
  const { each } = prop;
  const { link, title, description } = each;
  return (
    <li className="border border-1 border-primary rounded m-2 p-2">
      <h3 className="text-dark">{title}</h3>
      <a
        className="text-primary text-decoration-none"
        href={link}
        target="_blank"
        rel="noreferrer"
      >
        {link}
      </a>
      <p className="text-secondary">{description}</p>
    </li>
  );
};
export default SearchItems;
