import { AddapptableContainerModule } from './addapptable-container.module';

describe('AddapptableContainerModule', () => {
  let addapptableContainerModule: AddapptableContainerModule;

  beforeEach(() => {
    addapptableContainerModule = new AddapptableContainerModule();
  });

  it('should create an instance', () => {
    expect(addapptableContainerModule).toBeTruthy();
  });
});
