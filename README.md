# OOP Metrics Library

This library analyzes JavaScript files to calculate software metrics like **Fan-In** and **Fan-Out**. These metrics provide insight into code dependencies and usage patterns:

- **Fan-Out**: Shows all the external methods and files that a JavaScript file depends on.
- **Fan-In**: Lists the files where the current JavaScript file is being used.

## Installation

1. Clone the repository to your local machine:

   ```bash
   git clone https://github.com/danielzazzali/oop-metrics.git
   ```

2. Navigate to the project directory:

   ```bash
   cd oop-metrics
   ```

3. Install the necessary dependencies:

   ```bash
   npm install
   ```

## Usage

The `oop-metrics` command can be executed directly from your terminal. You can either run it in the current directory or specify a different directory as an argument.

### Example 1: Running in the current directory

If you are in the directory where your JavaScript files are located:

```bash
oop-metrics
```

This will calculate and display the **Fan-Out** and **Fan-In** for all JavaScript files in the directory.

### Example 2: Running with a specified path

You can also specify a path to analyze a different directory:

```bash
oop-metrics /path/to/your/javascript/files
```

### Sample Output

The tool will display output in JSON format with the structure of the **Fan-Out** and **Fan-In** metrics.

**Fan-Out** example:

```json
{
  "index.js": {
    "./metrics/visitor/Visitor": [ "Visitor" ],
    "./metrics/store/MetricsStore": [ "MetricsStore" ],
    "./utils/utils": [ "getAllJsFiles", "prettyPrint" ]
  },
  "metrics.js": {
    "./store/MetricsStore": [ "MetricsStore" ]
  }
}
```

**Fan-In** example:

```json
{
  "./metrics/visitor/Visitor": [ "index.js" ],
  "./metrics/store/MetricsStore": [ "index.js", "metrics.js" ]
}
```

## How It Works

1. **Fan-Out Calculation**: This identifies all external modules, methods, and functions imported or used within a JavaScript file.

2. **Fan-In Calculation**: This scans other files to determine where the current file is being referenced or imported.

## License

This project is licensed under the MIT License.

---