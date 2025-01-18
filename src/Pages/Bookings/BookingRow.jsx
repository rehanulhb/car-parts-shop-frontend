const BookingRow = ({ booking }) => {
  const {  date, service, price, img } = booking;
  return (
    <tr>
      <th>
        <label>
          <input type="checkbox" className="checkbox" />
        </label>
      </th>
      <td>
        <div className="avatar">
          <div className="mask mask-squircle h-24 w-24">
            <img
              src={img}
              alt="Avatar Tailwind CSS Component"
            />
          </div>
        </div>
        
      </td>
      <td>{service}</td>
      <td>{date}</td>
      <td>${price}</td>
      <th>
        <button className="btn btn-ghost btn-xs">details</button>
      </th>
    </tr>
  );
};

export default BookingRow;
