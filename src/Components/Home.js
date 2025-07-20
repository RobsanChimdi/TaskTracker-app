import React, { useReducer, useState, useMemo } from 'react';
import { useReactTable, getCoreRowModel, flexRender } from '@tanstack/react-table';
import '../App.css';
import Mine from './Mine';
import Header from './Header';

const initial = {
  Monday: [],
  Tuesday: [],
  Wednesday: [],
  Thursday: [], 
  Friday: [],
  Saturday: [],
  Sunday: [],
};

const reducer = (state, action) => {
  switch (action.type) {
    case 'Add':
      return {
        ...state,
        [action.payload.day]: [
          ...state[action.payload.day],
          {
            task: action.payload.task,
            status: action.payload.status,
            timeExpected: action.payload.timeexpected,
            finishingDate: action.payload.finishingDate
          },
        ],
      };
    case 'Update':
      return {
        ...state,
        [action.payload.day]: state[action.payload.day].map((item, index) => 
          index === action.payload.index ? { ...item, [action.payload.field]: action.payload.value } : item
        ),
      };
    case 'Delete':
      return {
        ...state,
        [action.payload.day]: state[action.payload.day].filter((_, index) => 
          index !== action.payload.index
        ),
      };
    default:
      return state;
  }
};

const Home = () => {

  const [task, setTask] = useState('');
  const [day, setDay] = useState('');
  const [status, setStatus] = useState('');
  const [timeexpected, setTimeExpected] = useState('');
  const [finishingDate, setFinishingDate] = useState('');
  
  const [completedCount, setCompletedCount] = useState(0);
  const [progressCount, setProgressCount] = useState(0);
  const [notStarted, setNotStartedCount] = useState(0);
  
  const [state, dispatch] = useReducer(reducer, initial);
  const [showForm, setShowForm] = useState(false);
  const [editingCell, setEditingCell] = useState(null);

  const handleAddTask = () => {
    if (!day || !task || !status || !timeexpected||!finishingDate) {
      alert('Please fill in all fields before adding a task.');
      return;
    }

    if (status === 'Completed') setCompletedCount(c => c + 1);
    else if (status === 'In Progress') setProgressCount(c => c + 1);
    else if (status === 'Not Started') setNotStartedCount(c => c + 1);

    dispatch({
      type: 'Add',
      payload: { task, day, status, timeexpected, finishingDate }
    });
    setTask('');
    setDay('');
    setStatus('');
    setTimeExpected('');
    setFinishingDate('');
    setShowForm(false);
  };

  const handleCellEdit = (day, index, field, value, previousValue) => {
    if (field === 'status') {
      if (previousValue === 'Completed') setCompletedCount(c => c - 1);
      else if (previousValue === 'In Progress') setProgressCount(c => c - 1);
      else if (previousValue === 'Not Started') setNotStartedCount(c => c - 1);

      if (value === 'Completed') setCompletedCount(c => c + 1);
      else if (value === 'In Progress') setProgressCount(c => c + 1);
      else if (value === 'Not Started') setNotStartedCount(c => c + 1);
    }

    dispatch({
      type: 'Update',
      payload: { day, index, field, value }
    });
  };

  const handleDeleteTask = (day, index, status) => {
 
    if (status === 'Completed') setCompletedCount(c => c - 1);
    else if (status === 'In Progress') setProgressCount(c => c - 1);
    else if (status === 'Not Started') setNotStartedCount(c => c - 1);

    dispatch({
      type: 'Delete',
      payload: { day, index }
    });
  };

  const data = useMemo(() => {
    return Object.entries(state).flatMap(([day, tasks]) =>
      tasks.map((task, index) => ({
        id: `${day}-${index}`,
        day,
        task: task.task,
        status: task.status,
        timeExpected: task.timeExpected,
        finishingDate: task.finishingDate,
        index,
      }))
    );
  }, [state]);

  const columns = useMemo(() => [
    {
      header: 'Day',
      accessorKey: 'day',
      size: 100,
      cell: ({ row }) => (
        <div 
          className="editable-cell"
          onClick={() => setEditingCell({ rowId: row.id, columnId: 'day' })}
        >
          {row.original.day}
        </div>
      )
    },
    {
      header: 'Task',
      accessorKey: 'task',
      size: 200,
      cell: ({ row }) => (
        <div 
          className="editable-cell"
          onClick={() => setEditingCell({ rowId: row.id, columnId: 'task' })}
        >
          {row.original.task}
        </div>
      )
    },
    {
      header: 'Status',
      accessorKey: 'status',
      size: 120,
      cell: ({ row }) => 
       (
          <div 
            className="editable-cell"
            onClick={() => setEditingCell({ rowId: row.id, columnId: 'status' })}
          >
            {row.original.status}
          </div>
        )
    },
    {
      header: 'Time Expected',
      accessorKey: 'timeExpected',
      size: 120,
      cell: ({ row }) => (
        <div 
          className="editable-cell"
          onClick={() => setEditingCell({ rowId: row.id, columnId: 'timeExpected' })}
        >
          {row.original.timeExpected}
        </div>
      )
    },
    {
      header: 'Finishing Date',
      accessorKey: 'finishingDate',
      size: 120,
      cell: ({ row }) => (
        <div 
          className="editable-cell"
          onClick={() => setEditingCell({ rowId: row.id, columnId: 'finishingDate' })}
        >
          {row.original.finishingDate}
        </div>
      )
    },
    {
      header: 'Actions',
      size: 80,
      cell: ({ row }) => (
        <button
          onClick={() => handleDeleteTask(row.original.day, row.original.index, row.original.status)}
          className="text-red-500 hover:text-red-700"
        >
          Delete
        </button>
      )
    }
  ], [editingCell]);

  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
    columnResizeMode: 'onChange',
    meta: {
      updateData: (rowIndex, columnId, value) => {
        const row = data[rowIndex];
        handleCellEdit(row.day, row.index, columnId, value);
      }
    }
  });

  return (
    <div className="p-4">
      <Header />
      
      <div className="flex flex-col md:flex-row gap-4">
        {/* Main Table */}
        <div className="flex-1 overflow-x-auto">
          <table className="w-full border-collapse">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="bg-gray-100">
                  {headerGroup.headers.map(header => (
                    <th 
                      key={header.id} 
                      className="border p-2 text-left"
                      style={{ width: header.getSize() }}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.map(row => (
                <tr key={row.id} className="hover:bg-gray-50">
                  {row.getVisibleCells().map(cell => {
                    const isEditing = editingCell?.rowId === row.id && editingCell?.columnId === cell.column.id;
                    
                    return (
                      <td 
                        key={cell.id} 
                        className="border p-2"
                        style={{ width: cell.column.getSize() }}
                      >
                        {isEditing ? (
                          cell.column.id === 'day' ? (
                            <select
                              value={row.original.day}
                              onChange={(e) => {
                                handleCellEdit(
                                  row.original.day,
                                  row.original.index,
                                  'day',
                                  e.target.value
                                );
                                setEditingCell(null);
                              }}
                              autoFocus
                              className="w-full p-1 border rounded"
                            >
                              {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                                <option key={day} value={day}>{day}</option>
                              ))}
                            </select>
                                ):cell.column.id==='status'?(
                            <select
                                  value={row.original.status}
                                  onChange={(e) => {
                                    handleCellEdit(
                                      row.original.day, 
                                      row.original.index, 
                                      'status', 
                                      e.target.value,
                                      row.original.status
                                    );
                                    setEditingCell(null);
                                  }}
                                  autoFocus
                                  className="w-full p-1 border rounded"
                                >
                                  <option value="Completed">Completed</option>
                                  <option value="In Progress">In Progress</option>
                                  <option value="Not Started">Not Started</option>
                          </select>
                              ) :cell.column.id === 'timeExpected' ? (
                            <input
                              type="time"
                              value={row.original.timeExpected}
                              onChange={(e) => {
                                table.options.meta?.updateData(
                                  row.index,
                                  'timeExpected',
                                  e.target.value
                                );
                              }}
                              onBlur={() => setEditingCell(null)}
                              onKeyDown={(e) => e.key === 'Enter' && setEditingCell(null)}
                              autoFocus
                              className="w-full p-1 border rounded"
                            />
                          ) : cell.column.id === 'finishingDate' ? (
                            <input
                              type="date"
                              value={row.original.finishingDate}
                              onChange={(e) => {
                                table.options.meta?.updateData(
                                  row.index,
                                  'finishingDate',
                                  e.target.value
                                );
                              }}
                              onBlur={() => setEditingCell(null)}
                              onKeyDown={(e) => e.key === 'Enter' && setEditingCell(null)}
                              autoFocus
                              className="w-full p-1 border rounded"
                            />
                          ) : (
                            <input
                              type="text"
                              value={row.original[cell.column.id]}
                              onChange={(e) => {
                                table.options.meta?.updateData(
                                  row.index,
                                  cell.column.id,
                                  e.target.value
                                );
                              }}
                              onBlur={() => setEditingCell(null)}
                              onKeyDown={(e) => e.key === 'Enter' && setEditingCell(null)}
                              autoFocus
                              className="w-full p-1 border rounded"
                            />
                          )
                        ) : (
                          flexRender(cell.column.columnDef.cell, cell.getContext())
                        )}
                      </td>
                    );
                  })}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Stats Component */}
        <Mine 
          tasknum={completedCount} 
          tasknum2={progressCount} 
          tasknum3={notStarted}
        />
      </div>

      {/* Add Task Button */}
      <button 
        onClick={() => setShowForm(true)}
        className="fixed bottom-4 right-4 bg-blue-500 text-white p-3 rounded-full shadow-lg hover:bg-blue-600 transition"
      >
        + Add Task
      </button>

      {/* Add Task Form Modal */}
      {showForm && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <h2 className="text-xl font-bold mb-4">Add New Task</h2>
            
            <div className="space-y-4">
              <div>
                <label className="block mb-1">Day</label>
                <select
                  value={day}
                  onChange={(e) => setDay(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Day</option>
                  {['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'].map(day => (
                    <option key={day} value={day}>{day}</option>
                  ))}
                </select>
              </div>
              
              <div>
                <label className="block mb-1">Task</label>
                <input
                  type="text"
                  placeholder="Enter task"
                  value={task}
                  onChange={(e) => setTask(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block mb-1">Status</label>
                <select
                  value={status}
                  onChange={(e) => setStatus(e.target.value)}
                  className="w-full p-2 border rounded"
                >
                  <option value="">Select Status</option>
                  <option value="Completed">Completed</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Not Started">Not Started</option>
                </select>
              </div>
              
              <div>
                <label className="block mb-1">Time Expected</label>
                <input
                  type="time"
                  value={timeexpected}
                  onChange={(e) => setTimeExpected(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
              
              <div>
                <label className="block mb-1">Finishing Date</label>
                <input
                  type="date"
                  value={finishingDate}
                  onChange={(e) => setFinishingDate(e.target.value)}
                  className="w-full p-2 border rounded"
                />
              </div>
            </div>
            
            <div className="flex justify-end space-x-2 mt-6">
              <button
                onClick={() => setShowForm(false)}
                className="px-4 py-2 border rounded hover:bg-gray-100"
              >
                Cancel
              </button>
              <button
                onClick={handleAddTask}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
              >
                Add Task
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Home;