export default function TransactionRow({ transaction }: { transaction: any }) {
  return (
    <tr>
      <td>{transaction.customer}</td>
      <td>{transaction.amount}</td>
      <td>{transaction.status}</td>
      <td>{transaction.date}</td>
    </tr>
  );
}
