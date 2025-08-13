import React from 'react'
export default function DataTable({ columns, rows, keyField='id' }){
  return (
    <div className="card">
      <table className="table">
        <thead><tr>{columns.map(c => <th key={c.key} className="th">{c.header}</th>)}</tr></thead>
        <tbody>
          {(!rows || rows.length===0) ? (
            <tr><td className="td" colSpan={columns.length}>No data</td></tr>
          ) : rows.map((r,i) => (
            <tr key={r[keyField] ?? i}>
              {columns.map(c => <td key={c.key} className="td">{String(r[c.key] ?? '')}</td>)}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}
