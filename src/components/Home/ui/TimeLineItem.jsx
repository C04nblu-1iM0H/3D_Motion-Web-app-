export default function TimelineItem({ title, descriptions }) {
  return(
    <div className="rounded-md p-7 transition duration-300 m-4 border border-solid border-blue-500">
      <h2 className="text-2xl mb-6 border-b-4 border-b-blue-500">{title}</h2>
      <ol>
        {descriptions.map((item, index) => (
          <li key={index} className="text-lg">{index}.<span className="ml-2">{item}</span></li>
        ))}
      </ol>
    </div>
  );
}
