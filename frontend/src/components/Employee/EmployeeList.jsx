import { useState, useEffect } from 'react';
import axios from 'axios';
import { AiOutlineDelete, AiOutlineEdit } from 'react-icons/ai';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { Dialog, DialogActions, DialogContent, DialogTitle, Button, TextField } from '@mui/material';

const EmployeeList = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [open, setOpen] = useState(false);
  const [selectedEmployeeId, setSelectedEmployeeId] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchEmployees = async () => {
      try {
        const response = await axios.get('http://localhost:4000/api/getAllEmployees');
        setEmployees(response.data.employees || []);
        setFilteredEmployees(response.data.employees || []);
      } catch (error) {
        console.error('Error fetching employee data:', error);
      }
    };

    fetchEmployees();
  }, []);

  useEffect(() => {
    const filtered = employees.filter(employee =>
      employee.id.includes(searchQuery) ||
      employee.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      employee.email.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredEmployees(filtered);
  }, [searchQuery, employees]);

  const handleEdit = (id) => {
    navigate(`/edit-employee/${id}`);
  };

  const handleDeleteClick = (id) => {
    setSelectedEmployeeId(id);
    setOpen(true);
  };

  const handleCloseDialog = () => {
    setOpen(false);
    setSelectedEmployeeId(null);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:4000/api/deleteEmployee/${selectedEmployeeId}`);
      setEmployees(employees.filter((employee) => employee.id !== selectedEmployeeId));
      toast.success("Employee deleted successfully!");
    } catch (error) {
      toast.error("Error deleting employee: " + (error.response?.data?.message || error.message));
      console.error('Error deleting employee:', error);
    } finally {
      handleCloseDialog();
    }
  };

  return (
    <div className="w-full flex flex-col items-center pt-5">
      <div className="w-[97%]">
        <h3 className="text-[22px] font-Poppins pb-2">All Employees</h3>
        
        {/* Search Box */}
        <div className="mb-4 w-full max-w-sm">
          <TextField
            label="Search Employees"
            variant="outlined"
            fullWidth
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>

        <div className="w-full min-h-[45vh] bg-white rounded shadow-md">
          <table className="w-full border-separate border-spacing-0 border border-gray-300">
            <thead>
              <tr className="bg-gray-100 border-b border-gray-300">
                <th className="p-2 text-left">Employee ID</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Email</th>
                <th className="p-2 text-left">Mobile</th>
                <th className="p-2 text-left">Designation</th>
                <th className="p-2 text-left">Gender</th>
                <th className="p-2 text-left">Course</th>
                <th className="p-2 text-left">Edit</th>
                <th className="p-2 text-left">Delete</th>
              </tr>
            </thead>
            <tbody>
              {filteredEmployees.map((employee) => (
                <tr key={employee.id} className="border-b border-gray-300 hover:bg-gray-50">
                  <td className="p-2">{employee.id}</td>
                  <td className="p-2">{employee.name}</td>
                  <td className="p-2">{employee.email}</td>
                  <td className="p-2">{employee.mobile}</td>
                  <td className="p-2">{employee.designation}</td>
                  <td className="p-2">{employee.gender}</td>
                  <td className="p-2">{employee.course.join(", ")}</td>
                  <td className="p-2 text-center">
                    <AiOutlineEdit
                      onClick={() => handleEdit(employee.id)}
                      className="text-blue-500 cursor-pointer"
                      size={24}
                    />
                  </td>
                  <td className="p-2 text-center">
                    <AiOutlineDelete
                      onClick={() => handleDeleteClick(employee.id)}
                      className="text-red-500 cursor-pointer"
                      size={24}
                    />
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Confirmation Dialog */}
      <Dialog open={open} onClose={handleCloseDialog}>
        <DialogTitle>Confirm Delete</DialogTitle>
        <DialogContent>
          <p>Are you sure you want to delete this employee?</p>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseDialog} color="primary">
            Cancel
          </Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EmployeeList;
