function Board({ data }) {
  console.log(data);
  return (
    <div className='board'>
      <h2>{data.name}</h2>
      <ul className='board-list'>
        {data.tasks.map(({ id, text }) => (
          <li key={id}>
            <p>{text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default Board;
