import { Command } from "commander";

const program = new Command();

program.option("--env <env>", "Enviroment", "development").parse(process.argv);

export { program };
