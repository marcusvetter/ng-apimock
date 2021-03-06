import * as http from 'http';
import {httpHeaders} from '../../http';
import Handler from '../../handler';
import Registry from '../../registry';

/** Abstract Handler for deleting a variable. */
abstract class DeleteVariablesHandler implements Handler {
    VARIABLE_REGEXP = new RegExp('/ngapimock/variables/(.*)');

    /**
     * delete the variable.
     * @param registry The registry.
     * @param variable The variable.
     * @param ngApimockId The ngApimock id.
     * @return variables The variables.
     */
    abstract deleteVariable(registry: Registry, variable: string, ngApimockId?: string): void;


    /**
     * @inheritDoc
     *
     * Handler that takes care of adding and updating variables.
     */
    handleRequest(request: http.IncomingMessage, response: http.ServerResponse, next: Function, registry: Registry,
                  ngApimockId: string): void {
        this.deleteVariable(registry, this.VARIABLE_REGEXP.exec(request.url)[1], ngApimockId);

        response.writeHead(200, httpHeaders.CONTENT_TYPE_APPLICATION_JSON);
        response.end();
    }
}

export default DeleteVariablesHandler;
