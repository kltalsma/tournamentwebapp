import React from 'react';

export const Table = ({ children }) => {
  return (
    <table>
      {children}
    </table>
  );
};

Table.Header = ({ children }) => <thead>{children}</thead>;
Table.Body = ({ children }) => <tbody>{children}</tbody>;
Table.Row = ({ children }) => <tr>{children}</tr>;
Table.Head = ({ children }) => <th>{children}</th>;
Table.Cell = ({ children }) => <td>{children}</td>;

