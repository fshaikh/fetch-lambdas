import CLIArgs from "../models/CLIArgs";
import CsvRenderer from "./csv/CsvRenderer";
import ConsoleRenderer from "./console/ConsoleRenderer";
export default function getOutputFormatter(cliArgs: CLIArgs): CsvRenderer | ConsoleRenderer;
