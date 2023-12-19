-- CreateTable
CREATE TABLE "_eventsToeventsTemplates" (
    "A" INTEGER NOT NULL,
    "B" INTEGER NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "_eventsToeventsTemplates_AB_unique" ON "_eventsToeventsTemplates"("A", "B");

-- CreateIndex
CREATE INDEX "_eventsToeventsTemplates_B_index" ON "_eventsToeventsTemplates"("B");

-- AddForeignKey
ALTER TABLE "_eventsToeventsTemplates" ADD CONSTRAINT "_eventsToeventsTemplates_A_fkey" FOREIGN KEY ("A") REFERENCES "events"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "_eventsToeventsTemplates" ADD CONSTRAINT "_eventsToeventsTemplates_B_fkey" FOREIGN KEY ("B") REFERENCES "eventsTemplates"("id") ON DELETE CASCADE ON UPDATE CASCADE;
