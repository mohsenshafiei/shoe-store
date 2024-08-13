import { rimraf } from 'rimraf';
import pc from 'picocolors';
import ora from 'ora';

const removeDirectory = async (path, options) => {
  const spinner = ora(`Removing ${path}...`).start();
  try {
    const result = await rimraf(path, options);
    if (result instanceof Error) {
      spinner.fail(pc.red(`Error removing ${path}: ${result.message}`));
    } else {
      spinner.succeed(pc.green(`${path} folder removed.`));
    }
  } catch (error) {
    spinner.fail(pc.red(`Unexpected error removing ${path}: ${error}`));
  }
};

removeDirectory('node_modules');
removeDirectory('dist');
removeDirectory('dev-dist');
