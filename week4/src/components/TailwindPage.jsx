function TailwindPage() {
  return (
    <>
      <nav className="bg-purple-800 text-white flex justify-between">
        <img
          src="https://randomuser.me/api/portraits/men/75.jpg"
          className="h-10 pt-3 px-3 rounded-2xl"
          alt=""
        />
        <ul className="px-28 py-4 flex space-x-11 justify-end">
          <li className="cursor-pointer">Home</li>
          <li className="cursor-pointer">About</li>
          <li className="cursor-pointer">Collection</li>
          <li className="cursor-pointer">Contact Us</li>
        </ul>
      </nav>
      <main className=" bg-fuchsia-100 flex">
        <div className="main  py-40  pl-9">
          <div className="text-6xl">The Best Phones in the Town</div>
          <p className="py-3 w-1/3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Veniam
            sequi quas fugit expedita beatae voluptates laudantium inventore,
            delectus laboriosam reiciendis asperiores, nihil id.
          </p>
          <div className="button gap-1">
            <button className="bg-purple-800 px-3 py-2 rounded-2xl text-white hover:text-slate-900 hover:bg-fuchsia-700 mx-2">
              Buy Now
            </button>
            <button className="bg-purple-800 px-3 py-2 rounded-2xl text-white hover:text-slate-900 hover:bg-fuchsia-700 mx-2">
              Contact Us
            </button>
          </div>
        </div>
        <div className="flex item-center">
          <img
            src="data:image/jpeg;base64,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"
           className="h-60" alt=""
          />
        </div>
      </main>
    </>
  );
}
export default TailwindPage;
