namespace Tweek.Drivers.Context.Cassandra.IntegrationTests
{
    public class CassandraIntegrationTests : ContextIntegrationTests.IntegrationTests
    {
        public RedisIntegrationTests()
        {
        }

        protected sealed override IContextDriver Driver { get; set; }
    }
}
