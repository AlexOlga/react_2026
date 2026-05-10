type ListMockProps = {
  list: { name: string }[];
};

export default function CardListMock(props: ListMockProps) {
  const { list } = props;
  return (
    <div data-testid="card-list">
      {list.map((pokemon) => (
        <p key={pokemon.name}>{pokemon.name}</p>
      ))}
    </div>
  );
}
