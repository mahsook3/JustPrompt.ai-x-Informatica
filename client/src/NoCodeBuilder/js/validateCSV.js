import { toast } from 'react-toastify';

const validateCSV = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = (e) => {
      const text = e.target.result;
      const rows = text.split("\n").filter(row => row.trim() !== ""); // Ignore empty rows
      const headers = rows[0].split(",").map(header => header.trim());
      const requiredHeaders = ["id", "name", "price", "rating", "image", "category", "minOrder", "isNew", "discount"];

      console.log("CSV Headers:", headers);
      console.log("CSV Rows:", rows);

      if (!requiredHeaders.every(header => headers.includes(header))) {
        toast.error("CSV file must contain the correct headers");
        console.error("Missing headers. Required:", requiredHeaders, "Found:", headers);
        resolve(false);
        return;
      }

      for (let i = 1; i < rows.length; i++) {
        const cells = rows[i].split(",").map(cell => cell.trim());
        if (cells.length !== headers.length || cells.some(cell => cell === "")) {
          toast.error("CSV file must not contain empty fields");
          console.error("Invalid row at index", i, ":", cells);
          resolve(false);
          return;
        }
      }

      toast.success("CSV file is valid");
      resolve(rows);
    };
    reader.readAsText(file);
  });
};

export default validateCSV;