/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
      return knex.schema.createTable('transactions', (table) => {
        table.increments('transaction_id').primary();
        table.integer('id').unsigned().notNullable();
        table.foreign('id').references('id').inTable('users').onDelete('CASCADE');
        table.string('transaction_type').notNullable(); // deposit or transfer
        table.decimal('amount', 15, 2).notNullable(); // Amount with 2 decimal places
        table.string('recipient_account').nullable(); 
        table.string('status').defaultTo('pending'); // Transaction status
        table.timestamp('created_at').defaultTo(knex.fn.now()); 
    });

};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
   return knex.schema.dropTable('transactions');
};
